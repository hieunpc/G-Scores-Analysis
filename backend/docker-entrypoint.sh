#!/bin/sh
set -e

echo "Running database migrations..."
# Skip migration for now - tables already created
# npm run migration:run:prod

echo "Checking if database needs seeding..."
npm run seed:prod

echo "Starting application..."
exec npm run start:prod
