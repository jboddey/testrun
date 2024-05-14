/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AppState } from './state';
import {
  selectDeviceInProgress,
  selectDevices,
  selectError,
  selectHasConnectionSettings,
  selectHasDevices,
  selectInterfaces,
  selectIsOpenAddDevice,
  selectIsOpenStartTestrun,
  selectIsOpenWaitSnackBar,
  selectIsStopTestrun,
  selectIsTestrunStarted,
  selectMenuOpened,
  selectSystemStatus,
} from './selectors';

describe('Selectors', () => {
  const initialState: AppState = {
    appComponent: {
      isMenuOpen: false,
      interfaces: {},
      isStatusLoaded: false,
      devicesLength: 0,
      focusNavigation: false,
      settingMissedError: null,
    },
    shared: {
      hasConnectionSettings: false,
      devices: [],
      hasDevices: false,
      isOpenAddDevice: false,
      isStopTestrun: false,
      isOpenWaitSnackBar: false,
      isOpenStartTestrun: false,
      systemStatus: null,
      isTestrunStarted: false,
      deviceInProgress: null,
    },
  };

  it('should select the is menu opened', () => {
    const result = selectMenuOpened.projector(initialState);
    expect(result).toEqual(false);
  });

  it('should select interfaces', () => {
    const result = selectInterfaces.projector(initialState);
    expect(result).toEqual({});
  });

  it('should select has connection settings', () => {
    const result = selectHasConnectionSettings.projector(initialState);
    expect(result).toEqual(false);
  });

  it('should select settingMissedError', () => {
    const result = selectError.projector(initialState);
    expect(result).toEqual(null);
  });

  it('should select devices', () => {
    const result = selectDevices.projector(initialState);
    expect(result).toEqual([]);
  });

  it('should select hasDevices', () => {
    const result = selectHasDevices.projector(initialState);
    expect(result).toEqual(false);
  });

  it('should select isOpenAddDevice', () => {
    const result = selectIsOpenAddDevice.projector(initialState);
    expect(result).toEqual(false);
  });

  it('should select systemStatus', () => {
    const result = selectSystemStatus.projector(initialState);
    expect(result).toEqual(null);
  });

  it('should select isTestrunStarted', () => {
    const result = selectIsTestrunStarted.projector(initialState);
    expect(result).toEqual(false);
  });

  it('should select isOpenStartTestrun', () => {
    const result = selectIsOpenStartTestrun.projector(initialState);
    expect(result).toEqual(false);
  });

  it('should select isStopTestrun', () => {
    const result = selectIsStopTestrun.projector(initialState);
    expect(result).toEqual(false);
  });

  it('should select isOpenWaitSnackBar', () => {
    const result = selectIsOpenWaitSnackBar.projector(initialState);
    expect(result).toEqual(false);
  });

  it('should select deviceInProgress', () => {
    const result = selectDeviceInProgress.projector(initialState);
    expect(result).toEqual(null);
  });
});
