# Security Review Checklist

- [ ] All sensitive API endpoints require authentication and proper role (RBAC).
- [ ] Session expiration and invalidation are tested.
- [ ] Rate limiting is enabled for all APIs (preferably with Redis in production).
- [ ] Audit logs are kept for login, file upload, and payment actions.
- [ ] No sensitive data is exposed in logs or error messages.
- [ ] All user input is validated and sanitized.
- [ ] File uploads are scanned for viruses/malware (TODO for production). 