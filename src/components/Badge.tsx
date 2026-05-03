import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius } from '../theme';

interface BadgeProps {
  label: string;
  color?: string;
  bgColor?: string;
  style?: ViewStyle;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = Colors.primary,
  bgColor,
  style,
  size = 'sm',
}) => {
  const bg = bgColor || color + '22';
  const padding = size === 'sm' ? { paddingHorizontal: 10, paddingVertical: 4 } : { paddingHorizontal: 14, paddingVertical: 6 };
  const fontSize = size === 'sm' ? 11 : 13;

  return (
    <View style={[styles.badge, { backgroundColor: bg }, padding, style]}>
      <Text style={[styles.text, { color, fontSize }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
