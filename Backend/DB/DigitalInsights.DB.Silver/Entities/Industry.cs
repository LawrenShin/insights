﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalInsights.DB.Silver.Entities
{
    public partial class Industry
    {
        public Industry()
        {
            CompanyIndustries = new HashSet<CompanyIndustry>();
            IndustryCountries = new HashSet<IndustryCountry>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public DateTime EffectiveFrom { get; set; }

        [JsonIgnore]
        public virtual ICollection<CompanyIndustry> CompanyIndustries { get; set; }
        [JsonIgnore]
        public virtual ICollection<IndustryCountry> IndustryCountries { get; set; }
    }
}
