# AWS Workshop — Student Login Guide

## Login Details

| | URL |
|---|---|
| Portal | https://lpstech.awsapps.com/start |
| Account | LPS_Managed_Prod |
| Role | Workshop-Student |

## Student Credentials

| Username | One-Time Password |
|----------|-------------------|
| student1 | `cUaAEGPw1G$` |
| student2 | `6nwl<cV&^2r` |
| student3 | `2V/_J6.jl8G6j7pj&!vC>9<f_RHrSHAM_^NNgoXF?` |
| student4 | `xerNH_NB@u3UXLPcj4@U.bgWBWo7x31h2nCYlr` |

> You will be asked to change your password on first login.

## How to Log In

1. Open https://lpstech.awsapps.com/start
2. Enter your username (e.g. `student1`) and the one-time password above
3. Set a new password when prompted
4. Set up MFA (you'll need an authenticator app like Google Authenticator or Microsoft Authenticator)
5. After login, click **LPS_Managed_Prod** → **Workshop-Student**
6. Choose **Management Console** to open the AWS Console

## Set Up AWS CLI Profile (for Kiro / local development)

To use Kiro or the AWS CLI with your workshop credentials, set up an SSO profile on your local machine.

### Step 1: Install AWS CLI v2

If you don't have it yet, download from: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

Verify installation:
```
aws --version
```

### Step 2: Configure your SSO profile

Run the following command and follow the prompts:

```
aws configure sso
```

When prompted, enter these values:

| Prompt | Value |
|--------|-------|
| SSO session name | `workshop` |
| SSO start URL | `https://lpstech.awsapps.com/start` |
| SSO region | `ap-southeast-1` |
| SSO registration scopes | *(press Enter to accept default)* |

A browser window will open — log in with your student username and password. After authorizing, return to the terminal.

Then select:

| Prompt | Value |
|--------|-------|
| Account | `LPS_Managed_Prod (245650696234)` |
| Role | `Workshop-Student` |
| CLI default client Region | `ap-southeast-1` |
| CLI default output format | `json` |
| CLI profile name | `workshop-student` |

### Step 3: Verify it works

```
aws sts get-caller-identity --profile workshop-student
```

You should see your account ID (245650696234) and role.

### Step 4: Use with Kiro

In Kiro, when running AWS commands, use `--profile workshop-student` to authenticate with your workshop credentials. Kiro's MCP AWS tools will use this profile to access your permitted services.

To refresh your SSO session if it expires:
```
aws sso login --profile workshop-student
```

## What You Can Do

| Service | Allowed Actions |
|---------|----------------|
| EC2 | Launch/stop/terminate instances (t3.micro and t3.small only) |
| S3 | Create buckets, upload/download/delete objects |
| DynamoDB | Create/delete tables, read/write items |
| Lambda | Create/invoke/delete functions |
| IAM | Create roles prefixed with `workshop-` (for Lambda execution) |
| CloudWatch | View logs and metrics (read-only) |

## Rules

- Only `t3.micro` and `t3.small` EC2 instances are allowed
- IAM roles must be named `workshop-*` (e.g. `workshop-lambda-role`)
- Clean up your resources when done — delete instances, buckets, tables, and functions
- Region: `ap-southeast-1` (Singapore)

## Need Help?

Contact your workshop instructor or the Cloud Admin team.
