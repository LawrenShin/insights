﻿using DigitalInsights.DB.Gold.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace DigitalInsights.RatingModels.WeightedSumModels.SpecificModels.Sexuality
{
    internal class BoardSexualityScoreModel : OverallSexualityScoreModel
    {
        protected override bool IsRoleMatching(Role role)
        {
            return role.RoleType == "Board" || role.RoleType == "Both";
        }
    }
}
