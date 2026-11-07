#!/usr/bin/env bash
set -e

source "$HOME/.nvm/nvm.sh"
nvm use 22 >/dev/null
exec next dev --hostname 0.0.0.0
