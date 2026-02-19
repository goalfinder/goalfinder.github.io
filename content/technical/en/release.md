# Release
The following is a guide on how to release new firmware versions to GitHub.

## Release Workflow
Following workflow from `.github/workflows/main.yml`:
1. Checks out the repository with full history.
2. Extracts the version from the tag and the current git commit hash.
3. Updates version files using a Python script.
4. Sets up Node.js and installs web dependencies.
5. Builds the web app.
6. Caches Python and PlatformIO dependencies.
7. Sets up Python and installs PlatformIO.
8. Builds the firmware and filesystem for the target board.
9. Publishes the built firmware and filesystem binaries as a GitHub release.#
This ensures that the entire firmware get's build without issue as to not release a non working version.

## Versioning Rules
Following rules are to be followed when versioning a new release.
Version Format: `vX.Y.Z(o)`
- `X`: Major changes have been made and there is no backwards compatibility. **Always discuss such a release with other team members first**
- `Y`: New features or enhancements have been implemented. Backwards compatibility is kept or improved.
- `Z`: A patch has been applied for bug fixes, performance enhancements or minor internal changes.
### Pre-Release Tags
Pre-Release Tags are optional and are to be put in place of the optional placeholder `o`
- `a`: **alpha** Very early release, likely to contain bugs with very limited testing.
- `b`: **beta** More stable than the alpha release with more testing having been carried out.
- none: Full release: Complete testing and production ready.

## Release to GitHub
Tag and push to trigger automatic build and release.
```
git tag vX.Y.Z(o)
git push origin vX.Y.Z(o)
```

## Dev Builds & Testing
**This script is only to be used during development and not to be used in production.**
Update the version displayed in the web app using the `update-version.py` script.
**Dev builds:**: `python update-version.py X.Y.Z(o)-dev`
**Regular builds:**: `python update-version.py X.Y.Z(o)`

#end