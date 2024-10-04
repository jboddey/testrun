# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Image name: testrun/ws
FROM eclipse-mosquitto@sha256:e72463a079f2af6579b8c7b1a9e35c3fd4b7fff6ae9d60c8b05209077b370f55

RUN mkdir -p /mosquitto/data/

COPY modules/ws/conf/mosquitto.conf /mosquitto/config/mosquitto.conf

VOLUME /mosquitto/data/