﻿using CsvHelper.Configuration;
using DigitalInsights.DB.Silver.Entities.CountryData;
using System;
using System.Collections.Generic;
using System.Text;

namespace DigitalInsights.DataLoaders.Silver.CountryLoader.Model.CSV
{
    class CountryDisabilityMap : ClassMap<CountryDisability>
    {
        public CountryDisabilityMap()
        {
            Map(m => m.Disabled).Name("Disabled");
            Map(m => m.DiscriminationLaw).Name("DisabilityDiscriminationLaw");
            Map(m => m.Overweight).Name("Overweight");
            Map(m => m.HealthFundingGdp).Name("HealthFundingGDP");
            Map(m => m.HealthFundingType).Name("HealthFundingType");
        }
    }
}
