#!/bin/sh
set -e

echo "Running database migrations..."
npm run typeorm migration:run

echo "Checking if database needs seeding..."
npm run seed:prod

echo "Starting application..."
exec npm run start:prod
