# Aurora Backoffice
This repository contains the management interface of the Aurora software suite.
The backoffice is primarily responsible for sending commands to the [core](https://github.com/gewis/aurora-core) over HTTP.
To see the current state of Aurora, the backoffice can also receive SocketIO messages.

## Prerequisites
- NodeJS 22.
- A locally running copy of [aurora-core](https://github.com/gewis/aurora-core).
The backoffice repository should be cloned next to the core repository, so in the folder `../aurora-core`.
This is necessary to generate the required API client files (installation step 2).

## Installation
1. Run `yarn`.
2. Run `yarn gen-client` to generate the Typescript files required to communicate with the core.
3. Run `yarn dev`.
4. The application is now running at http://localhost:8080.
In a development environment with a local copy of Aurora Core, you should be logged in automatically.

## Deployment
Deployment is done using Docker-compose in the core repository.
This should work out of the box if you meet the prerequisites.

### Compatibility table
The following table describes which version of Aurora Backoffice are compatible with which
version of Aurora Core. The contents of this table is determined by: If Aurora Backoffice
version X is released at a certain point in time, what was the most recent version of
Aurora Core at that same time? These two versions are guaranteed to work together. You can
use newer versions of the core than listed in the table row, but no newer than the next row,
as the new version might include changes from the core.

<!-- COMPATIBILITY_TABLE skip:2 -->
| Aurora Backoffice | Aurora Core |
|-------------------|-------------|
| v1.4.0 | v2.1.0+ |
| v1.3.0 | v2.0.0+ |
| v1.2.0 | v1.4.0+ |
| v1.1.0 | v1.2.0+ |
| v1.0.1 | v1.0.0+ |
| v1.0.0 | v1.0.0+ |

## Copyright
Copyright © 2023-2024 Study Association GEWIS - Some rights reserved.
You can use our software freely within the limits of our license.
However, we worked very hard on this project and invested a lot of time in it
so we ask you to leave our copyright marks in place when modifying our software.
Of course, you are free to add your own.

## License
Aurora uses the [AGPL-3.0 license](LICENSE).
