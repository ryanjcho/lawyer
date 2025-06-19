# Error Page QA Checklist

- [ ] Visit a non-existent route (e.g., /thispagedoesnotexist) and confirm the 404 page appears.
- [ ] Cause a client-side error (e.g., throw in a button click handler) and confirm the error page appears.
- [ ] Cause a server-side error (e.g., throw in an API route) and confirm the error page appears.
- [ ] All error pages should have a clear message and a way to return home. 