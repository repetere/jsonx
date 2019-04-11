import React from 'react';

//elements
export * as Typography from '@react-spectre/typography/src';
export * as Table from '@react-spectre/table/src';
export * as Button from '@react-spectre/button/src';
export * as Form from '@react-spectre/form/src';
export * as Icon from '@react-spectre/icon/src';
export * as Label from '@react-spectre/label/src';
export * as Media from '@react-spectre/media/src';

//layout
export * as Layout from '@react-spectre/layout/src';
export * as Grid from '@react-spectre/grid/src';
export * as Navbar from '@react-spectre/navbar/src';

//components
export * as Accordion from '@react-spectre/accordion/src';
export * as Autocomplete from '@react-spectre/autocomplete/src';
export * as Avatar from '@react-spectre/avatar/src';
export * as Badge from '@react-spectre/badge/src';
export * as Bar from '@react-spectre/bar/src';
export * as Toast from '@react-spectre/toast/src';
import * as CardModule from '../lib/vendor/react-spectre-master/packages/card/src/index';
import * as PanelModule from '../lib/vendor/react-spectre-master/packages/panel/src/index';
import * as StepModule from '../lib/vendor/react-spectre-master/packages/step/src/index';
import * as PopoverModule from '../lib/vendor/react-spectre-master/packages/popover/src/index';
import * as TileModule from '../lib/vendor/react-spectre-master/packages/tile/src/index';

export const Card = Object.assign({ Card: CardModule.Card, }, CardModule.Card, CardModule);
export const Panel = Object.assign({ Panel: PanelModule.Panel, }, PanelModule.Panel, PanelModule);
export const Step = Object.assign({ Step: StepModule.Step, }, StepModule.Step, StepModule);
export const Popover = Object.assign({ Popover: PopoverModule.Popover, }, PopoverModule.Popover, PopoverModule);
export const Tile = Object.assign({ Tile: TileModule.Tile, }, TileModule.Tile, TileModule);

