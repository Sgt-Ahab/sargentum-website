# Security Policy — Vulnerability Disclosure

**Sargentum Systems & Research LLC** ("SSR", "we", "us")

**Version:** 1.1  
**Last Updated:** July 2026  
**Effective Date:** July 2026

SSR is committed to building reliable, secure, and responsibly maintained systems. We welcome good-faith security research that helps protect our users, partners, customers, and the public. This policy governs how security vulnerabilities should be reported and how we will respond.

---

## 1. Scope

This policy applies to:

- All websites and domains owned or operated by SSR (including but not limited to sargentum.systems and any subdomains)
- Software, tools, platforms, and services developed, maintained, or distributed by SSR
- Infrastructure, APIs, and backend systems directly under SSR control
- Public repositories and documentation published by SSR

This policy **does not** apply to:

- Third-party services, libraries, or infrastructure not operated by SSR
- Social engineering, phishing, or physical security attacks
- Denial-of-service (DoS/DDoS) attacks or attempts to disrupt service availability
- Issues that require excessive automated traffic, scraping, or brute-force attempts
- Vulnerabilities in systems you do not have explicit authorization to test

---

## 2. Reporting a Vulnerability

We strongly prefer coordinated, responsible disclosure.

**Primary Contact:**
security@sargentum.systems

**When reporting, please include:**
- A clear, concise description of the vulnerability
- Detailed steps to reproduce (including any necessary accounts, configurations, or environment details)
- The specific affected system, domain, endpoint, or component
- Any relevant logs, screenshots, proof-of-concept code, or supporting evidence
- Your contact information and preferred method of follow-up

**Do not:**
- Publicly disclose the vulnerability before we have had a reasonable opportunity to investigate and remediate
- Access, modify, or exfiltrate data beyond what is strictly necessary to demonstrate the issue
- Perform testing that could impact production systems or other users without prior written authorization

---

## 3. Our Response Process

Upon receiving a good-faith report, SSR will:

1. **Acknowledge receipt** within **5 business days** (we aim for faster when possible).
2. **Triage and assess** the report to determine validity, severity, and scope.
3. **Communicate** with you regarding status and any additional information needed.
4. **Remediate** confirmed vulnerabilities in a timely manner based on severity.
5. **Coordinate disclosure** with you when appropriate (we generally prefer to credit researchers who follow this policy).

We strive to act responsibly even on minor or non-exploitable issues. We may share relevant findings with affected third parties or upstream projects when necessary for broader protection.

---

## 4. Researcher Expectations & Rules of Engagement

To qualify for safe harbor and potential acknowledgment, researchers must:

- Act in good faith with the genuine intent to improve security.
- Limit testing to systems and data you have explicit or implicit authorization to access.
- Avoid causing harm, data loss, service disruption, or privacy violations.
- Not perform actions that would be illegal under applicable law.
- Allow SSR a reasonable period (minimum 30 days, or longer for complex issues) to investigate and remediate before any public disclosure.
- Not use findings for personal gain, extortion, or any malicious purpose.

**We do not currently offer a bug bounty program.** Any rewards or compensation are provided at SSR’s sole discretion.

---

## 5. Legal Safe Harbor

SSR will not pursue legal action against individuals who:

- Act in good faith
- Follow the rules outlined in this policy
- Do not intentionally cause harm, exfiltrate data, or disrupt services
- Do not violate applicable laws

This safe harbor applies **only** to activities conducted in accordance with this policy and within the defined scope. Activities outside this policy (including testing without authorization or public disclosure before remediation) are not protected.

Nothing in this policy constitutes a waiver of any legal rights or remedies SSR may have.

---

## 6. Policy Governance

- This policy may be updated periodically as SSR grows and its systems evolve.
- The authoritative version will always be published at:  
  `https://sargentum.systems/security-policy.md`
- Previous versions will be archived when significant changes occur.

**Questions?** Contact security@sargentum.systems

---

*Security is a continuous process, not a destination. We value the contributions of responsible researchers who help us build stronger systems.*