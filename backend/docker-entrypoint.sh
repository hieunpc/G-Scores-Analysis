#!/bin/sh
set -e

echo "Checking if database needs seeding..."
npm run seed:prod

echo "Starting application..."
exec npm run start:prod
