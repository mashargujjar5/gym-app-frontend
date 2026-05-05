import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Colors, Typography, BorderRadius } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  containerStyle,
  ...props
}) => {
  const [secureText, setSecureText] = useState(isPassword);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          focused && { borderColor: Colors.primary },
          error ? { borderColor: Colors.error } : null,
          props.multiline && { height: 120, alignItems: 'flex-start' }
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, props.multiline && { textAlignVertical: 'top', paddingTop: 12 }]}
          placeholderTextColor={Colors.textMuted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secureText}
          underlineColorAndroid="transparent"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.iconRight}
            activeOpacity={0.7}
          >
            <Text style={styles.eyeIcon}>{secureText ? '👁' : '🙈'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...Typography.label,
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    height: 56, // Fixed height for absolute stability
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  iconLeft: {
    paddingLeft: 14,
  },
  iconRight: {
    paddingRight: 14,
    height: '100%',
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 16,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
