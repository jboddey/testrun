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
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBreadcrumbsComponent } from './progress-breadcrumbs.component';
import { MatIconModule } from '@angular/material/icon';

describe('ProgressBreadcrumbsComponent', () => {
  let component: ProgressBreadcrumbsComponent;
  let fixture: ComponentFixture<ProgressBreadcrumbsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressBreadcrumbsComponent],
      imports: [MatIconModule],
    });
    fixture = TestBed.createComponent(ProgressBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
