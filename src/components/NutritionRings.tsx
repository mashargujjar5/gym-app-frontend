import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../theme';

export interface RingData {
  progress: number; // 0-1
  color: string;
}

interface NutritionRingsProps {
  size?: number;
  strokeWidth?: number;
  gap?: number;
  centerTopText?: string | number;
  centerBottomText?: string | number;
  rings: RingData[];
}

export const NutritionRings: React.FC<NutritionRingsProps> = ({
  size = 280,
  strokeWidth = 10,
  gap = 4,
  centerTopText,
  centerBottomText,
  rings,
}) => {
  const center = size / 2;
  
  // Calculate radius for each ring starting from the outside
  const ringsWithRadius = rings.map((ring, index) => {
    const radius = (size / 2) - (strokeWidth / 2) - (index * (strokeWidth + gap));
    return { ...ring, radius };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {ringsWithRadius.map((ring, index) => {
          // If radius is too small, don't render
          if (ring.radius <= 0) return null;
          
          const circumference = 2 * Math.PI * ring.radius;
          const strokeDashoffset = circumference - (Math.min(Math.max(ring.progress, 0), 1)) * circumference;
          
          return (
            <React.Fragment key={index}>
              {/* Track */}
              <Circle
                cx={center}
                cy={center}
                r={ring.radius}
                stroke={`${ring.color}20`} // Very light version for track
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress */}
              <Circle
                cx={center}
                cy={center}
                r={ring.radius}
                stroke={ring.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
              />
            </React.Fragment>
          );
        })}
      </Svg>
      <View style={styles.centerTextContainer}>
        {centerTopText !== undefined && (
          <Text style={styles.centerTopText}>{centerTopText}</Text>
        )}
        {centerBottomText !== undefined && (
          <Text style={styles.centerBottomText}>{centerBottomText}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTopText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  centerBottomText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
});
