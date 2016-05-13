#!/bin/bash

# Inotify wait on the frontend templates, and recompile when they change.
# Should probably do this with a gruntfile, etc in the future
when-changed templates/handlebars/* 'node_modules/handlebars/bin/handlebars templates/handlebars/* -f static/js/templates.js; echo "Done"'
