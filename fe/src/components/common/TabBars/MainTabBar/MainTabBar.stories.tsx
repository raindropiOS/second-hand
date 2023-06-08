import MainTabBar from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Common/MainTabBar',
  component: MainTabBar,
  args: {},
} as ComponentMeta<typeof MainTabBar>;

export const Default: ComponentStory<typeof MainTabBar> = () => <MainTabBar />;
