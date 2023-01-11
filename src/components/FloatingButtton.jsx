import React from 'react'
import { FAB } from 'react-native-paper'

export default function FloatingButtton({ props }) {
  return (
    <FAB
    icon={props.icon}
    style={styles.fab}
    onPress={() => console.log('Pressed')}
  />
  )
}
