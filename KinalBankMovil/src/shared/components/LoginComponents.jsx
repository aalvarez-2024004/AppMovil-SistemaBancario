import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { KB, fi } from '../constants/login';

export const KBInput = ({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, error }) => {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <View style={fi.wrapper}>
      <Text style={fi.label}>{label}</Text>
      <View style={[fi.box, focused && fi.boxFocused, error && fi.boxError]}>
        <TextInput
          style={fi.input}
          placeholder={placeholder}
          placeholderTextColor={KB.gray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPass}
          keyboardType={keyboardType || 'default'}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity style={fi.eye} onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={KB.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={fi.error}>{error}</Text> : null}
    </View>
  );
};