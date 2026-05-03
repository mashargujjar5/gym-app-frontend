import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../theme';

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0-1
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
  centerText?: string;
  centerSubText?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  color = Colors.primary,
  trackColor = Colors.surfaceLight,
  label,
  sublabel,
  centerText,
  centerSubText,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;
  const center = size / 2;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={center}
          originY={center}
        />
      </Svg>
      {(centerText || centerSubText) && (
        <View style={[styles.center, { width: size, height: size }]}>
          {centerText && (
            <Text style={[styles.centerText, { color }]}>{centerText}</Text>
          )}
          {centerSubText && (
            <Text style={styles.centerSubText}>{centerSubText}</Text>
          )}
        </View>
      )}
      {label && <Text style={styles.label}>{label}</Text>}
      {sublabel && <Text style={styles.sublabel}>{sublabel}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  centerSubText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  label: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  sublabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
