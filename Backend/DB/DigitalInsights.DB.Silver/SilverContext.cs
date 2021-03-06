﻿using System;
using DigitalInsights.DB.Silver.Entities;
using DigitalInsights.DB.Silver.Entities.CountryData;
using DigitalInsights.DB.Silver.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Logging;

namespace DigitalInsights.DB.Silver
{
    public partial class SilverContext : DbContext
    {
        private ILoggerFactory _loggerFactory;

        public SilverContext()
        {
        }

        public SilverContext(DbContextOptions<SilverContext> options)
            : base(options)
        {
        }

        public SilverContext(ILoggerFactory loggerFactory)
        {
            _loggerFactory = loggerFactory;
        }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<CompanyCountry> CompanyCountries { get; set; }
        public virtual DbSet<CompanyExtendedData> CompanyExtendedData { get; set; }
        public virtual DbSet<CompanyIndustry> CompanyIndustries { get; set; }
        public virtual DbSet<CompanyMatch> CompanyMatches { get; set; }
        public virtual DbSet<CompanyName> CompanyNames { get; set; }
        public virtual DbSet<Entities.CompanyQuestion> CompanyQuestionnaires { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<CountryAge> CountryAges { get; set; }
        public virtual DbSet<CountryDemographic> CountryDemographics { get; set; }
        public virtual DbSet<CountryDisability> CountryDisabilities { get; set; }
        public virtual DbSet<CountryEconomy> CountryEconomies { get; set; }
        public virtual DbSet<CountryEdu> CountryEdus { get; set; }
        public virtual DbSet<CountryGender> CountryGenders { get; set; }
        public virtual DbSet<CountryPolitical> CountryPoliticals { get; set; }
        public virtual DbSet<CountryRace> CountryRaces { get; set; }
        public virtual DbSet<CountryReligion> CountryReligions { get; set; }
        public virtual DbSet<CountrySex> CountrySexes { get; set; }
        public virtual DbSet<CountryUrban> CountryUrbans { get; set; }
        public virtual DbSet<Industry> Industries { get; set; }
        public virtual DbSet<IndustryCountry> IndustryCountries { get; set; }
        public virtual DbSet<Person> People { get; set; }
        public virtual DbSet<PersonCountry> PersonCountries { get; set; }
        public virtual DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=di-dev.c19yqc3su48v.us-east-2.rds.amazonaws.com;Port=5432;Database=DI-silver;Username=postgres;Password=2wsx##edc");

                if (_loggerFactory != null) {
                    optionsBuilder.UseLoggerFactory(_loggerFactory);
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("address");

                entity.HasIndex(e => e.Id, "address_id_pk")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AddressLine)
                    .IsRequired()
                    .HasMaxLength(650)
                    .HasColumnName("address_line");

                entity.Property(e => e.AddressNumber)
                    .HasMaxLength(100)
                    .HasColumnName("address_number")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("city");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.PostalCode)
                    .HasMaxLength(70)
                    .HasColumnName("postal_code")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Region)
                    .HasMaxLength(10)
                    .HasColumnName("region")
                    .HasDefaultValueSql("NULL::character varying");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("address_country_id_fkey");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("company");

                entity.HasIndex(e => e.Id, "company_id_pk")
                    .IsUnique();

                entity.HasIndex(e => e.Lei, "company_lei_idx")
                    .HasMethod("hash");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.HqId).HasColumnName("hq_id");

                entity.Property(e => e.LegalId).HasColumnName("legal_id");

                entity.Property(e => e.LegalName)
                    .HasMaxLength(400)
                    .HasColumnName("legal_name")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Lei)
                    .HasMaxLength(20)
                    .HasColumnName("lei")
                    .HasDefaultValueSql("NULL::bpchar")
                    .IsFixedLength(true);

                entity.Property(e => e.NumEmployees).HasColumnName("num_employees");

                entity.Property(e => e.Status)
                    .HasMaxLength(30)
                    .HasColumnName("status")
                    .HasDefaultValueSql("NULL::character varying");

                entity.HasOne(d => d.Hq)
                    .WithMany(p => p.CompanyHqs)
                    .HasForeignKey(d => d.HqId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("company_hq_id_fkey");

                entity.HasOne(d => d.Legal)
                    .WithMany(p => p.CompanyLegals)
                    .HasForeignKey(d => d.LegalId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("company_legal_id_fkey");
            });

            modelBuilder.Entity<CompanyCountry>(entity =>
            {
                entity.ToTable("company_country");

                entity.Property(e => e.CompanyCountryId).HasColumnName("company_country_id");

                entity.Property(e => e.CompanyCountryEffectiveFrom)
                    .HasColumnName("company_country_effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.IsPrimary).HasColumnName("is_primary");

                entity.Property(e => e.LegalJurisdiction).HasColumnName("legal_jurisdiction");

                entity.Property(e => e.Ticker)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("ticker");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyCountries)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("company_country_company_id_fkey");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CompanyCountries)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("company_country_country_id_fkey");
            });

            modelBuilder.Entity<CompanyExtendedData>(entity =>
            {
                entity.ToTable("company_extended_data");

                entity.HasIndex(e => e.CompanyId, "company_extended_data_company_id_idx");

                entity.HasIndex(e => e.Id, "company_extended_data_id_pk")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BelowNationalAvgIncome).HasColumnName("below_national_avg_income");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.DisabledEmployees).HasColumnName("disabled_employees");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.HierarchyLevel).HasColumnName("hierarchy_level");

                entity.Property(e => e.MedianSalary).HasColumnName("median_salary");

                entity.Property(e => e.RetentionRate).HasColumnName("retention_rate");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyExtendedData)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("company_extended_data_company_id_fkey");
            });

            modelBuilder.Entity<CompanyIndustry>(entity =>
            {
                entity.ToTable("company_industry");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.IndustryId).HasColumnName("industry_id");

                entity.Property(e => e.PrimarySecondary)
                    .HasMaxLength(1)
                    .HasColumnName("primary_secondary");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyIndustries)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("company_industry_company_id_fkey");

                entity.HasOne(d => d.Industry)
                    .WithMany(p => p.CompanyIndustries)
                    .HasForeignKey(d => d.IndustryId)
                    .HasConstraintName("company_industry_industry_id_fkey");
            });

            modelBuilder.Entity<CompanyMatch>(entity =>
            {
                entity.ToTable("company_match");

                entity.HasIndex(e => e.Id, "company_match_id_pk")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(400)
                    .HasColumnName("name");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyMatches)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("company_match_company_id_fkey");
            });

            modelBuilder.Entity<CompanyName>(entity =>
            {
                entity.ToTable("company_name");

                entity.HasIndex(e => e.CompanyId, "company_name_company_id_idx");

                entity.HasIndex(e => e.Id, "company_name_id_pk")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(400)
                    .HasColumnName("name");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("type");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyNames)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("company_name_company_id_fkey");
            });

            modelBuilder.Entity<Entities.CompanyQuestion>(entity =>
            {
                entity.ToTable("company_questionnaire");

                entity.HasIndex(e => e.CompanyId, "company_questionnaire_company_id_idx");

                entity.HasIndex(e => e.Id, "company_questionnaire_id_pk")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Answer).HasColumnName("answer");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                var converter = new ValueConverter<Enums.CompanyQuestion, int>(
                    v => (int)v,
                    v => (Enums.CompanyQuestion)v
                    );

                entity.Property(e => e.Question)
                    .HasColumnName("question")
                    .HasConversion(converter); ;

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyQuestionnaires)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("company_questionnaire_company_id_fkey");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("country");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(3)
                    .HasColumnName("code");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(45)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<CountryAge>(entity =>
            {
                entity.ToTable("country_age");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Avg18).HasColumnName("avg18");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.Dis19).HasColumnName("dis19");

                entity.Property(e => e.Dis39).HasColumnName("dis39");

                entity.Property(e => e.Dis59).HasColumnName("dis59");

                entity.Property(e => e.Dis70).HasColumnName("dis70");

                entity.Property(e => e.Disx).HasColumnName("disx");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Ministers).HasColumnName("ministers");

                entity.Property(e => e.Parliament).HasColumnName("parliament");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryAges)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_age_country_id_fkey");
            });

            modelBuilder.Entity<CountryDemographic>(entity =>
            {
                entity.ToTable("country_demographics");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.ImmigrantPercent).HasColumnName("immigrant_percent");

                entity.Property(e => e.ImmigrantPop).HasColumnName("immigrant_pop");

                entity.Property(e => e.Population).HasColumnName("population");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryDemographics)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_demographics_country_id_fkey");
            });

            modelBuilder.Entity<CountryDisability>(entity =>
            {
                entity.ToTable("country_disability");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.Disabled).HasColumnName("disabled");

                entity.Property(e => e.DiscriminationLaw).HasColumnName("discrimination_law");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.HealthFundingGdp).HasColumnName("health_funding_gdp");

                entity.Property(e => e.HealthFundingType).HasColumnName("health_funding_type");

                entity.Property(e => e.Overweight).HasColumnName("overweight");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryDisabilities)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_disability_country_id_fkey");
            });

            modelBuilder.Entity<CountryEconomy>(entity =>
            {
                entity.ToTable("country_economy");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AvgIncome).HasColumnName("avg_income");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.EqualityLevel).HasColumnName("equality_level");

                entity.Property(e => e.FemaleUnemploy).HasColumnName("female_unemploy");

                entity.Property(e => e.Gdp).HasColumnName("gdp");

                entity.Property(e => e.GdpPerCapita).HasColumnName("gdp_per_capita");

                entity.Property(e => e.GdpWorld).HasColumnName("gdp_world");

                entity.Property(e => e.LabourForce).HasColumnName("labour_force");

                entity.Property(e => e.LabourForcePercent).HasColumnName("labour_force_percent");

                entity.Property(e => e.MaleUnemploy).HasColumnName("male_unemploy");

                entity.Property(e => e.Poor).HasColumnName("poor");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryEconomies)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_economy_country_id_fkey");
            });

            modelBuilder.Entity<CountryEdu>(entity =>
            {
                entity.ToTable("country_edu");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ActualEducation).HasColumnName("actual_education");

                entity.Property(e => e.BachelorFemale).HasColumnName("bachelor_female");

                entity.Property(e => e.BachelorMale).HasColumnName("bachelor_male");

                entity.Property(e => e.BachelorMf).HasColumnName("bachelor_mf");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.ElementaryFemale).HasColumnName("elementary_female");

                entity.Property(e => e.ElementaryMale).HasColumnName("elementary_male");

                entity.Property(e => e.ElementaryMf).HasColumnName("elementary_mf");

                entity.Property(e => e.ExpectedEducation).HasColumnName("expected_education");

                entity.Property(e => e.HighSchoolFemale).HasColumnName("high_school_female");

                entity.Property(e => e.HighSchoolMale).HasColumnName("high_school_male");

                entity.Property(e => e.HighSchoolMf).HasColumnName("high_school_mf");

                entity.Property(e => e.MasterFemale).HasColumnName("master_female");

                entity.Property(e => e.MasterMale).HasColumnName("master_male");

                entity.Property(e => e.MasterMf).HasColumnName("master_mf");

                entity.Property(e => e.PublicFundFund).HasColumnName("public_fund_fund");

                entity.Property(e => e.PublicFundingGdp).HasColumnName("public_funding_gdp");

                entity.Property(e => e.TotalMf).HasColumnName("total_mf");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryEdus)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_edu_country_id_fkey");
            });

            modelBuilder.Entity<CountryGender>(entity =>
            {
                entity.ToTable("country_gender");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.FemaleMinisterShare).HasColumnName("female_minister_share");

                entity.Property(e => e.FemaleParliamentShare).HasColumnName("female_parliament_share");

                entity.Property(e => e.FemalePop).HasColumnName("female_pop");

                entity.Property(e => e.FemalePromotionPolicy).HasColumnName("female_promotion_policy");

                entity.Property(e => e.FemaleWorkForce).HasColumnName("female_work_force");

                entity.Property(e => e.FemaleWorkForcePercent).HasColumnName("female_work_force_percent");

                entity.Property(e => e.FemaleWorkForcePercentPop).HasColumnName("female_work_force_percent_pop");

                entity.Property(e => e.GenderEduGap).HasColumnName("gender_edu_gap");

                entity.Property(e => e.GenderHealthGap).HasColumnName("gender_health_gap");

                entity.Property(e => e.GenderPolGap).HasColumnName("gender_pol_gap");

                entity.Property(e => e.GenderWorkGap).HasColumnName("gender_work_gap");

                entity.Property(e => e.IncomeGap).HasColumnName("income_gap");

                entity.Property(e => e.LifeFemale).HasColumnName("life_female");

                entity.Property(e => e.LifeMale).HasColumnName("life_male");

                entity.Property(e => e.MalePop).HasColumnName("male_pop");

                entity.Property(e => e.MaterintyLeave).HasColumnName("materinty_leave");

                entity.Property(e => e.PaternityLeave).HasColumnName("paternity_leave");

                entity.Property(e => e.WomenEdu).HasColumnName("women_edu");

                entity.Property(e => e.WomenViolence).HasColumnName("women_violence");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryGenders)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_gender_country_id_fkey");
            });

            modelBuilder.Entity<CountryPolitical>(entity =>
            {
                entity.ToTable("country_political");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Corruption).HasColumnName("corruption");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.Democracy).HasColumnName("democracy");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.FreedomSpeech).HasColumnName("freedom_speech");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryPoliticals)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_political_country_id_fkey");
            });

            modelBuilder.Entity<CountryRace>(entity =>
            {
                entity.ToTable("country_race");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Arab).HasColumnName("arab");

                entity.Property(e => e.Asian).HasColumnName("asian");

                entity.Property(e => e.Black).HasColumnName("black");

                entity.Property(e => e.Caucasian).HasColumnName("caucasian");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.DiscriminationLaw).HasColumnName("discrimination_law");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Hispanic).HasColumnName("hispanic");

                entity.Property(e => e.Indegineous).HasColumnName("indegineous");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryRaces)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_race_country_id_fkey");
            });

            modelBuilder.Entity<CountryReligion>(entity =>
            {
                entity.ToTable("country_religion");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Buddishm).HasColumnName("buddishm");

                entity.Property(e => e.Christian).HasColumnName("christian");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Freedom).HasColumnName("freedom");

                entity.Property(e => e.Hindu).HasColumnName("hindu");

                entity.Property(e => e.Judaism).HasColumnName("judaism");

                entity.Property(e => e.Muslim).HasColumnName("muslim");

                entity.Property(e => e.Other).HasColumnName("other");

                entity.Property(e => e.Statereligion).HasColumnName("statereligion");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryReligions)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_religion_country_id_fkey");
            });

            modelBuilder.Entity<CountrySex>(entity =>
            {
                entity.ToTable("country_sex");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.HomosexualPop).HasColumnName("homosexual_pop");

                entity.Property(e => e.HomosexualTolerance).HasColumnName("homosexual_tolerance");

                entity.Property(e => e.SameAdopt).HasColumnName("same_adopt");

                entity.Property(e => e.SameMarriage).HasColumnName("same_marriage");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountrySexes)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_sex_country_id_fkey");
            });

            modelBuilder.Entity<CountryUrban>(entity =>
            {
                entity.ToTable("country_urban");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CitiesPop).HasColumnName("cities_pop");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.CountryUrbans)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("country_urban_country_id_fkey");
            });

            modelBuilder.Entity<Industry>(entity =>
            {
                entity.ToTable("industry");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<IndustryCountry>(entity =>
            {
                entity.ToTable("industry_country");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AvgPay).HasColumnName("avg_pay");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.DiPledge).HasColumnName("di_pledge");

                entity.Property(e => e.DisabilitiesPledge).HasColumnName("disabilities_pledge");

                entity.Property(e => e.EducationSpend).HasColumnName("education_spend");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.FlexibleHoursPledge).HasColumnName("flexible_hours_pledge");

                entity.Property(e => e.HarassmentPledge).HasColumnName("harassment_pledge");

                entity.Property(e => e.IndustryDiversity).HasColumnName("industry_diversity");

                entity.Property(e => e.IndustryId).HasColumnName("industry_id");

                entity.Property(e => e.LgbtPledge).HasColumnName("lgbt_pledge");

                entity.Property(e => e.MaterintyLeavePledge).HasColumnName("materinty_leave_pledge");

                entity.Property(e => e.NumEmployees).HasColumnName("num_employees");

                entity.Property(e => e.PaternityLeavePledge).HasColumnName("paternity_leave_pledge");

                entity.Property(e => e.RententionRate).HasColumnName("rentention_rate");

                entity.Property(e => e.WomenEmployeedPercent).HasColumnName("women_employeed_percent");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.IndustryCountries)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("industry_country_country_id_fkey");

                entity.HasOne(d => d.Industry)
                    .WithMany(p => p.IndustryCountries)
                    .HasForeignKey(d => d.IndustryId)
                    .HasConstraintName("industry_country_industry_id_fkey");
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.ToTable("person");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address).HasColumnName("address");

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.BaseSalary).HasColumnName("base_salary");

                entity.Property(e => e.BirthYear).HasColumnName("birth_year");

                entity.Property(e => e.Disability)
                    .HasMaxLength(45)
                    .HasColumnName("disability")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.EduInstitute)
                    .HasMaxLength(100)
                    .HasColumnName("edu_institute")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.EduSubject)
                    .HasMaxLength(100)
                    .HasColumnName("edu_subject")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Gender)
                    .HasMaxLength(20)
                    .HasColumnName("gender")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.HighEdu)
                    .HasMaxLength(45)
                    .HasColumnName("high_edu")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Married)
                    .HasMaxLength(45)
                    .HasColumnName("married")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(135)
                    .HasColumnName("name");

                entity.Property(e => e.OtherIncentive).HasColumnName("other_incentive");

                entity.Property(e => e.Picture)
                    .HasMaxLength(45)
                    .HasColumnName("picture")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Race)
                    .HasMaxLength(45)
                    .HasColumnName("race")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Religion)
                    .HasMaxLength(45)
                    .HasColumnName("religion")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Sexuality)
                    .HasMaxLength(45)
                    .HasColumnName("sexuality")
                    .HasDefaultValueSql("NULL::character varying");

                var urbanConverter = new ValueConverter<bool, int>(
                    v => v ? 100 : 0,
                    v => v != 0
                    );

                entity.Property(e => e.Urban)
                    .HasColumnName("urban")
                    .HasDefaultValueSql("NULL::int")
                    .HasConversion(urbanConverter);

                entity.HasOne(d => d.AddressNavigation)
                    .WithMany(p => p.People)
                    .HasForeignKey(d => d.Address)
                    .HasConstraintName("person_address_fkey");
            });

            modelBuilder.Entity<PersonCountry>(entity =>
            {
                entity.ToTable("person_country");

                entity.Property(e => e.PersonCountryId).HasColumnName("person_country_id");

                entity.Property(e => e.CountryId).HasColumnName("country_id");

                entity.Property(e => e.PersonCountryEffectiveFrom)
                    .HasColumnName("person_country_effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.PersonId).HasColumnName("person_id");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.PersonCountries)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("person_country_country_id_fkey");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.PersonCountries)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("person_country_person_id_fkey");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BaseSalary).HasColumnName("base_salary");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.EffectiveFrom)
                    .HasColumnName("effective_from")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.IncentiveOptions)
                    .HasMaxLength(45)
                    .HasColumnName("incentive_options")
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.IsEffective).HasColumnName("is_effective");

                entity.Property(e => e.PersonId).HasColumnName("person_id");

                var converter = new ValueConverter<RoleType, int>(
                    v => (int)v,
                    v => (RoleType)v
                    );

                entity.Property(e => e.RoleType)
                    .IsRequired()
                    .HasColumnName("role_type")
                    .HasConversion(converter); ;

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasColumnName("title");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Roles)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("role_company_id_fkey");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Roles)
                    .HasForeignKey(d => d.PersonId)
                    .HasConstraintName("role_person_id_fkey");
            });            

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
