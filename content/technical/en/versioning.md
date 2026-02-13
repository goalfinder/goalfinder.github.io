# Versioning
The following is a guide on how to update the displayed version in the web app and push versions with tags to GitHub.

## Update Version in the Web App
Update the version displayed in the web app using the `update-version.py` script.

**Dev builds:**: `python update-version.py X.Y.Z-dev`
**Regular builds:**: `python update-version.py X.Y.Z`
**The format of versions is enforced and versioning will fail if not specified properly**
## Release to GitHub
Tag and push to trigger automatic build
```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

#end