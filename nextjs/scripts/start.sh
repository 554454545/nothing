#!/usr/bin/env bash
set -e

source "$HOME/.nvm/nvm.sh"
nvm use 22 >/dev/null
exec next start --hostname 0.0.0.0
