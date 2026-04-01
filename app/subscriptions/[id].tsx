import { View, Text } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router';

const SubscriptionDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Subscription Detail: {id}</Text>
      <Link href="/">Go back</Link>
    </View>
  )
}

export default SubscriptionDetail