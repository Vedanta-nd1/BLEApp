import { Platform } from "react-native"

// This file is used to add testID and accessibilityLabel to components for testing purposes
export const testProps = (input) => {
    return Platform.OS === 'ios' ? { testID: input } : { accessibilityLabel: input,  }
  }