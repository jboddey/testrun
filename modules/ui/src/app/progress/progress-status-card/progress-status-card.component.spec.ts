/**
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
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressStatusCardComponent} from './progress-status-card.component';
import {StatusOfTestrun, TestrunStatus} from '../../model/testrun-status';
import {MOCK_PROGRESS_DATA_CANCELLED, MOCK_PROGRESS_DATA_COMPLIANT, MOCK_PROGRESS_DATA_IN_PROGRESS} from '../../mocks/progress.mock';
import {ProgressModule} from '../progress.module';
import {of} from 'rxjs';

describe('ProgressStatusCardComponent', () => {
  let component: ProgressStatusCardComponent;
  let fixture: ComponentFixture<ProgressStatusCardComponent>;

  describe('Class tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProgressStatusCardComponent]
      });
      fixture = TestBed.createComponent(ProgressStatusCardComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('#getClass', () => {
      it('should have class "progress" if status "In Progress"', () => {
        const expectedResult = {
          progress: true,
          'completed-success': false,
          'completed-failed': false,
          canceled: false
        };

        const result = component.getClass(StatusOfTestrun.InProgress);

        expect(result).toEqual(expectedResult);
      });

      it('should have class "completed-success" if status "Compliant"', () => {
        const expectedResult = {
          progress: false,
          'completed-success': true,
          'completed-failed': false,
          canceled: false
        };

        const result = component.getClass(StatusOfTestrun.Compliant);

        expect(result).toEqual(expectedResult);
      });

      it('should have class "completed-failed" if status "Non Compliant"', () => {
        const expectedResult = {
          progress: false,
          'completed-success': false,
          'completed-failed': true,
          canceled: false
        };

        const result = component.getClass(StatusOfTestrun.NonCompliant);

        expect(result).toEqual(expectedResult);
      });

      it('should have class "canceled" if status "Cancelled"', () => {
        const expectedResult = {
          progress: false,
          'completed-success': false,
          'completed-failed': false,
          canceled: true
        };

        const result = component.getClass(StatusOfTestrun.Cancelled);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('#getTestsResult', () => {
      it('should return correct test result if status "In Progress"', () => {
        const expectedResult = '2/26';

        const result = component.getTestsResult(MOCK_PROGRESS_DATA_IN_PROGRESS);

        expect(result).toEqual(expectedResult);
      });

      it('should return correct test result if status "Compliant"', () => {
        const expectedResult = '2/2';

        const result = component.getTestsResult(MOCK_PROGRESS_DATA_COMPLIANT);

        expect(result).toEqual(expectedResult);
      });

      it('should return correct test result if status "Cancelled"', () => {
        const expectedResult = '2/26';

        const result = component.getTestsResult(MOCK_PROGRESS_DATA_CANCELLED);

        expect(result).toEqual(expectedResult);
      });

      it('should return empty string if no data', () => {
        const expectedResult = '';

        const result = component.getTestsResult({} as TestrunStatus);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('#getTestStatus', () => {
      it('should return test status "Complete" if testrun is finished', () => {
        const expectedResult = 'Complete';

        const result = component.getTestStatus(MOCK_PROGRESS_DATA_COMPLIANT);

        expect(result).toEqual(expectedResult);
      });

      it('should return test status "Incomplete" if status "Cancelled"', () => {
        const expectedResult = 'Incomplete';

        const result = component.getTestStatus(MOCK_PROGRESS_DATA_CANCELLED);

        expect(result).toEqual(expectedResult);
      });

      it('should return test status "In Progress" if status "In Progress"', () => {
        const expectedResult = 'In Progress';

        const result = component.getTestStatus(MOCK_PROGRESS_DATA_IN_PROGRESS);

        expect(result).toEqual(expectedResult);
      });
    });

    describe('#getProgressValue', () => {
      it('should return correct progress value if status "In Progress"', () => {
        const expectedResult = Math.round(2 / 26 * 100);

        const result = component.getProgressValue(MOCK_PROGRESS_DATA_IN_PROGRESS);

        expect(result).toEqual(expectedResult);
      });

      it('should return zero if no data', () => {
        const expectedResult = 0;

        const result = component.getProgressValue({} as TestrunStatus);

        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('DOM tests', () => {
    let compiled: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ProgressStatusCardComponent],
        imports: [ProgressModule]
      }).compileComponents();

      fixture = TestBed.createComponent(ProgressStatusCardComponent);
      compiled = fixture.nativeElement as HTMLElement;
      component = fixture.componentInstance;
    });

    describe('with not systemStatus$ data', () => {
      beforeEach(() => {
        (component.systemStatus$ as any) = of(null);
        fixture.detectChanges();
      });

      it('should not have content', () => {
        const progressCardEl = compiled.querySelector('.progress-card');

        expect(progressCardEl).toBeNull();
      });
    });

    describe('with available systemStatus$ data, as Cancelled', () => {
      beforeEach(() => {
        component.systemStatus$ = of(MOCK_PROGRESS_DATA_CANCELLED);
        fixture.detectChanges();
      });

      it('should have progress card content', () => {
        const progressCardEl = compiled.querySelector('.progress-card');

        expect(progressCardEl).not.toBeNull();
      });

      it('should have class "canceled" on progress card element', () => {
        const progressCardEl = compiled.querySelector('.progress-card');

        expect(progressCardEl?.classList).toContain('canceled');
      });

      it('should not have progress bar element', () => {
        const progressBarEl = compiled.querySelector('.progress-bar');

        expect(progressBarEl).toBeNull();
      });

      it('should have progress card result', () => {
        const progressCardResultEl = compiled.querySelector('.progress-card-result-text span');

        expect(progressCardResultEl).not.toBeNull();
        expect(progressCardResultEl?.textContent).toEqual('Cancelled');
      });

      it('should have progress card status text as "Incomplete"', () => {
        const progressCardStatusText = compiled.querySelector('.progress-card-status-text > span');

        expect(progressCardStatusText).not.toBeNull();
        expect(progressCardStatusText?.textContent).toEqual('Incomplete');
      });
    });

    describe('with available systemStatus$ data, as "In Progress"', () => {
      beforeEach(() => {
        component.systemStatus$ = of(MOCK_PROGRESS_DATA_IN_PROGRESS);
        fixture.detectChanges();
      });


      it('should have class "progress" on progress card element', () => {
        const progressCardEl = compiled.querySelector('.progress-card');

        expect(progressCardEl?.classList).toContain('progress');
      });

      it('should have progress bar element', () => {
        const progressBarEl = compiled.querySelector('.progress-bar');

        expect(progressBarEl).not.toBeNull();
      });

      it('should not have progress card result', () => {
        const progressCardResultEl = compiled.querySelector('.progress-card-result-text span');

        expect(progressCardResultEl).toBeNull();
      });

      it('should have progress card status text as "In Progress"', () => {
        const progressCardStatusText = compiled.querySelector('.progress-card-status-text > span');

        expect(progressCardStatusText).not.toBeNull();
        expect(progressCardStatusText?.textContent).toEqual('In Progress');
      });
    });
  });

});
