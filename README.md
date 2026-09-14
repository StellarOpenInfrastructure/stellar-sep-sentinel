# stellar-sep-sentinel

**Stellar SEP and anchor conformance testing.**

Automated discovery and validation of Stellar anchor implementations (SEP-6, SEP-24, SEP-31, etc.) with a CLI tool and core library.

```bash
stellar-sentinel audit example.com
```

Checks:
- ✅ stellar.toml present and valid
- ✅ SEP endpoints reachable
- ✅ Response schemas conform
- ✅ Auth flow compliance
- ⏳ Full Thrips Wave roadmap — 26 issues

See [docs/drips-wave.md](docs/drips-wave.md).
