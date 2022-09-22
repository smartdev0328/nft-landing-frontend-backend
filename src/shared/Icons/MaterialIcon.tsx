import * as icons from '@mui/icons-material';

export type IconNames = keyof typeof icons;

interface IMaterialIconProps {
  iconName: IconNames;
}

export const MaterialIcon = ({ iconName }: IMaterialIconProps): JSX.Element => {
  const Icon = icons[iconName];
  return <Icon />;
};
