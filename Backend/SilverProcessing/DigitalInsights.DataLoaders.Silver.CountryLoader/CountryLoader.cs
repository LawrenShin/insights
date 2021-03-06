using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using CsvHelper;
using DigitalInsights.Common.Logging;
using DigitalInsights.DataLoaders.Silver.CountryLoader.Model.CSV;
using DigitalInsights.DB.Silver;
using DigitalInsights.DB.Silver.Entities;
using DigitalInsights.DB.Silver.Entities.CountryData;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace DigitalInsights.DataLoaders.Silver.CountryLoader
{
    public class CountryLoader
    {
        const string TRANSFORMER_NAME = "COUNTRY LOADER";

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public void FunctionHandler(ILambdaContext context)
        {
            try
            {
                Stopwatch sw = new Stopwatch();
                sw.Start();
                Logger.Init(TRANSFORMER_NAME);
                Logger.Log("Started");
                // todo: switch to S3
                var filename = "C:\\temp\\country.csv";
                File.WriteAllText(filename, File.ReadAllText(filename).Replace(',', '.'));
                var str = File.ReadAllText(filename);
                str = str.Replace(',', '.');
                File.WriteAllText(filename, str);

                Logger.Log("Configuring DB context.");
                SilverContext dbContext = new SilverContext();
                dbContext.ChangeTracker.AutoDetectChangesEnabled = false;
                dbContext.ChangeTracker.LazyLoadingEnabled = true;

                using (var fileReader = new StreamReader(filename))
                {
                    Logger.Log("Configuring CSV reader");
                    var csvReader = new CsvReader(fileReader, CultureInfo.InvariantCulture);
                    csvReader.Configuration.Delimiter = ";";
                    csvReader.Configuration.MissingFieldFound = null;
                    csvReader.Configuration.RegisterClassMap<CountryAgeMap>();
                    csvReader.Configuration.RegisterClassMap<CountryDemographicsMap>();
                    csvReader.Configuration.RegisterClassMap<CountryDisabilityMap>();
                    csvReader.Configuration.RegisterClassMap<CountryEconomyMap>();
                    csvReader.Configuration.RegisterClassMap<CountryEduMap>();
                    csvReader.Configuration.RegisterClassMap<CountryGenderMap>();
                    csvReader.Configuration.RegisterClassMap<CountryMap>();
                    csvReader.Configuration.RegisterClassMap<CountryPoliticalMap>();
                    csvReader.Configuration.RegisterClassMap<CountryRaceMap>();
                    csvReader.Configuration.RegisterClassMap<CountryReligionMap>();
                    csvReader.Configuration.RegisterClassMap<CountrySexMap>();
                    csvReader.Configuration.RegisterClassMap<CountryUrbanMap>();

                    while (csvReader.Read())
                    {
                        var country = csvReader.GetRecord<Country>();

                        var countryAge = csvReader.GetRecord<CountryAge>();
                        countryAge.Country = country;
                        country.CountryAges.Add(countryAge);
                        dbContext.Add(countryAge);

                        var countryDemographic = csvReader.GetRecord<CountryDemographic>();
                        countryDemographic.Country = country;
                        country.CountryDemographics.Add(countryDemographic);
                        dbContext.Add(countryDemographic);

                        var countryDisability = csvReader.GetRecord<CountryDisability>();
                        countryDisability.Country = country;
                        country.CountryDisabilities.Add(countryDisability);
                        dbContext.Add(countryDisability);

                        var countryEconomy = csvReader.GetRecord<CountryEconomy>();
                        countryEconomy.Country = country;
                        country.CountryEconomies.Add(countryEconomy);
                        dbContext.Add(countryEconomy);

                        var countryEdu = csvReader.GetRecord<CountryEdu>();
                        countryEdu.Country = country;
                        country.CountryEdus.Add(countryEdu);
                        dbContext.Add(countryEdu);

                        var countryGender = csvReader.GetRecord<CountryGender>();
                        countryGender.Country = country;
                        country.CountryGenders.Add(countryGender);
                        dbContext.Add(countryGender);

                        var countryPolitical = csvReader.GetRecord<CountryPolitical>();
                        countryPolitical.Country = country;
                        country.CountryPoliticals.Add(countryPolitical);
                        dbContext.Add(countryPolitical);

                        var countryRace = csvReader.GetRecord<CountryRace>();
                        countryRace.Country = country;
                        country.CountryRaces.Add(countryRace);
                        dbContext.Add(countryRace);

                        var countryReligion = csvReader.GetRecord<CountryReligion>();
                        countryReligion.Country = country;
                        country.CountryReligions.Add(countryReligion);
                        dbContext.Add(countryReligion);

                        var countrySex = csvReader.GetRecord<CountrySex>();
                        countrySex.Country = country;
                        country.CountrySexes.Add(countrySex);
                        dbContext.Add(countrySex);

                        var countryUrban = csvReader.GetRecord<CountryUrban>();
                        countryUrban.Country = country;
                        country.CountryUrbans.Add(countryUrban);
                        dbContext.Add(countryUrban);

                        dbContext.Add(country);
                    }
                }

                dbContext.SaveChanges();
                dbContext.Dispose();

                sw.Stop();
                Logger.Log($"Finished successfully in {sw.ElapsedMilliseconds} ms");
            }
            catch (Exception ex)
            {
                Logger.Log($"ERROR: Unhandled exception: {ex.ToString()}");
            }
        }
    }
}
