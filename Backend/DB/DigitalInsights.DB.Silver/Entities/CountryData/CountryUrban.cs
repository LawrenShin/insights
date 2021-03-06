﻿using System;
using System.Collections.Generic;

#nullable disable

namespace DigitalInsights.DB.Silver.Entities.CountryData
{
    public partial class CountryUrban
    {
        public int Id { get; set; }
        public int? CountryId { get; set; }
        public double CitiesPop { get; set; }
        public DateTime EffectiveFrom { get; set; }

        public virtual Country Country { get; set; }
    }
}
