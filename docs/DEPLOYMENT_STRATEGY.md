# Deployment Strategy - WordPress Migration

## 🎯 Current Situation

### Production (Vercel)
- **Branch:** `main`
- **URL:** https://bamida-web-ai.vercel.app
- **Status:** ✅ Working (original Next.js site)
- **Content:** Static pages + Products

### Development (Local)
- **Branch:** `wordpress-migration` (NEW)
- **Status:** ✅ WordPress migration complete
- **Content:** 186 Payload CMS pages + Static pages

---

## 🔀 Branch Strategy

```
main (production)
│
└── wordpress-migration (feature)
    ├── Migration scripts
    ├── Payload Pages collection
    ├── Dynamic routing
    └── 186 migrated pages
```

### Branch: `main`
- **Purpose:** Production-ready code
- **Deployment:** Automatic to Vercel
- **Changes:** Only merge tested features
- **Status:** STABLE ✅

### Branch: `wordpress-migration`
- **Purpose:** WordPress migration development
- **Deployment:** Preview deployments only
- **Changes:** All migration work happens here
- **Status:** IN PROGRESS 🚧

---

## 📋 Next Steps

### Phase 1: Complete Migration (Current)
**On branch:** `wordpress-migration`

1. ✅ WordPress export (DONE)
2. ✅ Data migration (DONE - 186 URLs)
3. ✅ Dynamic routing (DONE)
4. ⏳ **Frontend cleanup** (NEXT)
   - Remove old static routes
   - Test all 186 pages
   - Verify no conflicts

### Phase 2: Testing & QA
**On branch:** `wordpress-migration`

1. **Test all migrated pages**
   - Verify each of 186 URLs loads
   - Check slug translations (SK/EN/DE)
   - Validate content rendering

2. **Test navigation**
   - Language switcher
   - Internal links
   - Breadcrumbs (if any)

3. **Performance testing**
   - Lighthouse scores
   - Page load times
   - SEO validation

### Phase 3: Staging Deployment
**Deploy to Vercel Preview**

```bash
# Push branch to GitHub
git push origin wordpress-migration

# Vercel automatically creates preview
# URL: https://bamida-web-ai-xyz123.vercel.app
```

**Testing on staging:**
- Full functionality test
- Multi-language switching
- SEO metadata check
- Mobile responsiveness

### Phase 4: Production Deployment
**Merge to main**

```bash
# Only after full QA approval
git checkout main
git merge wordpress-migration
git push origin main

# Vercel automatically deploys to production
```

---

## ⚠️ Important Considerations

### Before Merging to Main

**Required:**
- [ ] All 186 pages tested and working
- [ ] No 404 errors
- [ ] Navigation updated
- [ ] SEO metadata verified
- [ ] Performance acceptable (Lighthouse > 80)
- [ ] User acceptance testing passed

**Optional (can add later):**
- [ ] GeoIP language detection
- [ ] Structured data (JSON-LD)
- [ ] Advanced analytics

### Database Considerations

**Neon DB Configuration:**
- Same database for all branches ✅
- Migrations run once (already done)
- No data loss when switching branches

**Important:** Both `main` and `wordpress-migration` use the **same Neon DB**, so:
- Pages collection exists in both
- Data is shared
- No separate staging DB needed

### Rollback Plan

If migration has issues after merge:

```bash
# Quick rollback
git checkout main
git revert HEAD
git push origin main

# Vercel redeploys previous version
```

---

## 🚀 Recommended Deployment Flow

### Option A: Gradual Migration (RECOMMENDED)

1. **Keep both versions running:**
   - `main` branch → Production (old site)
   - `wordpress-migration` → Staging (new site)

2. **Test new site thoroughly:**
   - Preview URL from Vercel
   - Share with stakeholders
   - Gather feedback

3. **Merge when confident:**
   - All features tested
   - Performance validated
   - User approved

**Timeline:** 1-2 weeks testing

### Option B: Immediate Switch

1. **Complete cleanup** (remove old routes)
2. **Test locally** (all 186 pages)
3. **Push & merge** same day
4. **Deploy to production**

**Timeline:** 1-2 days

---

## 📊 Current Status

### Completed ✅
- WordPress export (62 pages)
- Slug translations (SK/EN/DE)
- Data migration (186 URLs, 100% success)
- Dynamic routing implemented
- Lexical content rendering
- SEO metadata
- Sitemap.xml

### In Progress 🚧
- Frontend cleanup (remove old routes)
- Navigation updates
- Final testing

### Not Started ⏳
- GeoIP detection (optional)
- Structured data (optional)
- Advanced SEO (optional)

---

## 💡 Recommendation

**Path Forward:**

1. **Now:** Finish cleanup on `wordpress-migration` branch
   - Remove old static routes
   - Test all pages locally

2. **Today:** Create Vercel preview deployment
   - Test on staging URL
   - Verify everything works

3. **This week:** QA & refinement
   - Fix any issues found
   - Optimize performance
   - Gather feedback

4. **Next week:** Merge to production
   - Deploy to main branch
   - Monitor for issues
   - Celebrate! 🎉

---

## 📞 Questions to Answer

Before proceeding, please confirm:

1. **Cleanup Approval?**
   - Should I remove old static routes (`/about`, `/contact`, etc.)?
   - Or keep some for comparison?

2. **Testing Scope?**
   - Test all 186 pages manually? (time-consuming)
   - Or automated testing + spot checks? (faster)

3. **Deployment Timeline?**
   - Rush to production (2-3 days)?
   - Gradual rollout (1-2 weeks)?
   - Your preference?

4. **Additional Features?**
   - Add GeoIP now? (delays 1 day)
   - Add JSON-LD now? (delays 1 day)
   - Or deploy basic version first?

---

**Current Branch:** `wordpress-migration`  
**Next Action:** Remove old routes → Test → Deploy staging
