import { Link, ExternalPathString } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  const { colors } = useTheme();

  if (Platform.OS === 'web') {
    return (
      <Link
        target="_blank"
        {...rest}
        href={href as ExternalPathString}
      />
    );
  }

  return (
    <TouchableOpacity
      onPress={async () => {
        await openBrowserAsync(href);
      }}
      {...rest}
    >
      <Text style={{ color: colors.primary }}>{rest.children}</Text>
    </TouchableOpacity>
  );
}
