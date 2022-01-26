run-build:
	npm run build

deploy: run-build
	aws s3 sync build/ s3://serverless-skill-manager --exclude '*.DS_Store' --acl public-read
