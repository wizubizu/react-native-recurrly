import { View, Text } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router';

const SubscriptionDetail = () => {
    const params = useLocalSearchParams<{ id?: string | string[] }>();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <View>
      <Text>Subscription Detail: {id ?? "unknown"}</Text>
      <Link href="/">Go back</Link>
    </View>
  )
}

export default SubscriptionDetail