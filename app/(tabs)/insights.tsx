import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import dayjs from "dayjs";
import { styled } from "nativewind";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

// Weekly data - expense values for each day
const WEEKLY_DATA = [
  { day: "Mon", amount: 35 },
  { day: "Tue", amount: 30 },
  { day: "Wed", amount: 20 },
  { day: "Thu", amount: 45 }, // Highlighted as today
  { day: "Fri", amount: 35 },
  { day: "Sat", amount: 20 },
  { day: "Sun", amount: 25 },
];

const MAX_BAR_HEIGHT = 180;

const BarChart = () => {
  const maxAmount = Math.max(...WEEKLY_DATA.map((d) => d.amount));

  return (
    <View className="gap-4 rounded-2xl bg-muted p-4">
      <View className="flex-row items-end justify-between gap-2">
        {WEEKLY_DATA.map((item, index) => {
          const height = (item.amount / maxAmount) * MAX_BAR_HEIGHT;
          const isHighlighted = index === 3; // Thursday

          return (
            <View key={item.day} className="flex-1 items-center gap-2">
              <View className="w-full items-center">
                {isHighlighted && item.amount > 0 && (
                  <Text className="mb-1 text-sm font-sans-bold text-accent">
                    ${item.amount}
                  </Text>
                )}
                <View
                  className={`w-full rounded-lg ${isHighlighted ? "bg-accent" : "bg-primary"}`}
                  style={{ height }}
                />
              </View>
              <Text className="text-xs font-sans-semibold text-muted-foreground">
                {item.day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Insights = () => {
  const [expandedSubscription, setExpandedSubscription] = React.useState<
    string | null
  >(null);

  // Calculate month stats
  const currentMonth = dayjs().format("MMMM YYYY");
  const monthlyTotal = HOME_SUBSCRIPTIONS.reduce(
    (sum, sub) => sum + sub.price,
    0,
  );
  const monthlyChange = 12; // +12% from previous month

  const handleSubscriptionPress = (id: string) => {
    setExpandedSubscription(expandedSubscription === id ? null : id);
  };

  // Get active subscriptions for history
  const activeSubscriptions = HOME_SUBSCRIPTIONS.slice(0, 2);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-5">
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-3xl font-sans-bold text-primary">
            Monthly Insights
          </Text>
          <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-card">
            <Text className="text-2xl text-primary">•••</Text>
          </Pressable>
        </View>

        {/* Upcoming Section */}
        <View className="mb-6">
          <ListHeading title="Upcoming" />
          <BarChart />
        </View>

        {/* Expenses Card */}
        <View className="mb-6 gap-3 rounded-2xl bg-muted p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-sans-bold text-primary">
              Expenses
            </Text>
            <Text className="text-xl font-sans-bold text-primary">
              ${monthlyTotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-sans-semibold text-muted-foreground">
              {currentMonth}
            </Text>
            <Text className="text-sm font-sans-semibold text-success">
              +{monthlyChange}%
            </Text>
          </View>
        </View>

        {/* History Section */}
        <View className="mb-6">
          <ListHeading title="History" />
          <View className="gap-3">
            {activeSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                {...subscription}
                expanded={expandedSubscription === subscription.id}
                onPress={() => handleSubscriptionPress(subscription.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default Insights;
