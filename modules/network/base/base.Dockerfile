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

# Image name: testrun/base
FROM ubuntu@sha256:77d57fd89366f7d16615794a5b53e124d742404e20f035c22032233f1826bd6a

RUN apt-get update -y

ARG MODULE_NAME=base
ARG MODULE_DIR=modules/network/$MODULE_NAME
ARG COMMON_DIR=framework/python/src/common

# Install common software
RUN DEBIAN_FRONTEND=noninteractive apt-get install -yq net-tools iputils-ping tzdata tcpdump iproute2 jq python3 python3-pip dos2unix

# Install common python modules
COPY $COMMON_DIR/ /testrun/python/src/common

# Setup the base python requirements
COPY $MODULE_DIR/python /testrun/python

# Install all python requirements for the module 
# --break-system-packages flag used to bypass PEP668
RUN pip3 install --break-system-packages -r /testrun/python/requirements.txt

# Add the bin files
COPY $MODULE_DIR/bin /testrun/bin

# Remove incorrect line endings
RUN dos2unix /testrun/bin/*

# Make sure all the bin files are executable
RUN chmod u+x /testrun/bin/*

# Start the network module
ENTRYPOINT [ "/testrun/bin/start_module" ]