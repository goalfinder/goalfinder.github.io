## Software Setup
This page contains instructions on how to set up the necessary software for the software side of the GoalFinder Project.

#ih Notice
#ib All installation guides are for Ubuntu based Linux distributions

## Website
Following Tools are necessary for developing the GoalFinder website.

## Ruby
**1. Update packages**: `sudo apt update`
**2. Install Ruby**: `sudo apt install -y ruby-full build-essential zlib1g-dev`

## Add Ruby Gem to PATH environmental variable (Optional)
#ih Notice
#ib Replace `<cli>` with the used shell (e.g. `bash` or `zsh`)
#ib The currently used shell can be identified with following command: `echo "$SHELL"`.
**1. Add Gem Home**: `echo 'export GEM_HOME="$HOME/gems"' >> ~/.<cli>rc`
**2. Add Gem to PATH** `echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.<cli>rc`
**3. Refresh shell**: `source ~/.<cli>rc`


## Jekyll
**Install Jekyll**: `gem install bundler jekyll`
