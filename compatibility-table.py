import argparse
import os.path
import re
import subprocess
import sys

COMPATIBILITY_TABLE_MARKER_REGEX = fr""

description = '''
Update the compatibility table in a README file by adding a new row. This new row will contain the new version together
with the (compatible) version of the dependency repository. Requires git.'''

parser = argparse.ArgumentParser(prog="Compatibility Table",
                                 description="Update the compatibility table in the given README file in the given repository.")

parser.add_argument('-s', '--source-repo',
                    help="Source git repository, probably the repository of the Readme file (mutually exclusive with --source-version)")
parser.add_argument('--source-version', help="Source version (mutually exclusive with -s)")
parser.add_argument('-r', '--readme', nargs=1, help="Readme file that needs to be updated", default="README.md")
parser.add_argument('-d', '--dependency-repo',
                    help="Dependency git repository: the one's whose version you want to know (mutually exclusive with --dependency-version)")
parser.add_argument('--dependency-version', help="Dependency version (mutually exclusive with -d)")

args = parser.parse_args()

# No required arguments given
if args.source_repo is None and args.source_version is None and args.dependency_repo is None and args.dependency_version is None:
    parser.print_help()
    sys.exit(0)

if not os.path.exists(args.readme):
    print("Cannot find readme file: \"{}\"".format(args.readme))
    sys.exit(1)


def get_version_from_git_repo(path: str) -> str:
    if not os.path.exists(path):
        print('Source repo cannot be found')
        sys.exit(1)
    if not os.path.isdir(path):
        print('Source repo is not a directory')
        sys.exit(1)
    if not os.path.exists(os.path.join(path, '.git')):
        print('Source repo does not contain a .git directory')
        sys.exit(1)
    p = subprocess.Popen(['git', 'describe', '--tags', '--abbrev=0'], stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                         text=True, cwd=path)
    out = p.communicate()

    if p.returncode != 0 or not out[0]:
        print('Getting latest tag from git repo "{}" failed with exit code {}:'.format(path, p.returncode))
        print(out)

    out = out[0].strip()
    return out


source_version = args.source_version
if source_version is None:
    source_version = get_version_from_git_repo(args.source_repo)

print('Source version: {}'.format(source_version))

dependency_version = args.dependency_version
if dependency_version is None:
    dependency_version = get_version_from_git_repo(args.dependency_repo)

print('Dependency version: {}'.format(dependency_version))

with open(args.readme, 'r') as f:
    readme_contents = f.readlines()

table_line = next(i for i, v in enumerate(readme_contents) if re.search(r'<!-- COMPATIBILITY_TABLE skip:\d+ -->', v))

print('Found compatibility marker on line {} in {}'.format(table_line + 1, args.readme))

marker_substring = '<!-- COMPATIBILITY_TABLE skip:'
skip_lines = int(readme_contents[table_line][len(marker_substring):].split(' ')[0])
add_line = table_line + skip_lines + 1
line_contents = '| {} | {}+ |'.format(source_version, dependency_version)
print('Insert "{}" at line {} in {}'.format(line_contents, add_line, args.readme))

readme_contents.insert(add_line, '{}\n'.format(line_contents))

with open(args.readme, 'w') as f:
    f.writelines(readme_contents)
