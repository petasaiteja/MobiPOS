import { View } from 'react-native'

export default function Gap({height}) {
  return (
    <View style={{ height: height ?? 20 }} />
  )
}
