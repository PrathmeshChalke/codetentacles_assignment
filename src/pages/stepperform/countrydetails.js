import React, { useEffect, useState } from "react";
import Select from "react-select";
import { countryData, stateData } from "../../api/Auth";

export default function CountryDetails({ formData, updateFormData, errors }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countryData();
        const countryOptions = data?.data?.map((country) => ({
          value: country?.id,
          label: country?.name,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!formData.countryId) {
      setStates([]);
      updateFormData("stateId", null); 
      return;
    }

    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const data = await stateData(formData.countryId?.value);
        const stateOptions = data?.data?.map((state) => ({
          value: state.id,
          label: state.name,
        }));
        setStates(stateOptions);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, [formData.countryId]);

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
          Country Details
        </h1>
        <form>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                Select Country <span className="text-red-500">*</span>
              </label>
              <Select
                className={`basic-single text-left text-sm text-gray-700 rounded border ${
                  errors?.countryId ? "border-red-500" : "border-gray-200"
                }`}
                classNamePrefix="select"
                options={countries}
                value={formData.countryId} // Pre-fill value from formData
                onChange={(selected) => {
                  updateFormData("countryId", selected);
                  updateFormData("stateId", null);
                }}
                onBlur={() => {
                  if (!formData.countryId)
                    errors.countryId = "Please select/enter a Country.";
                }}
              />
              {errors?.countryId && (
                <p className="text-red-500 text-sm text-start">
                  {errors.countryId}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                Select State <span className="text-red-500">*</span>
              </label>
              <Select
                className={`basic-single text-left text-sm text-gray-700 rounded border ${
                  errors?.stateId ? "border-red-500" : "border-gray-200"
                }`}
                classNamePrefix="select"
                options={states}
                value={formData.stateId}
                isDisabled={!formData?.countryId || loadingStates}
                isLoading={loadingStates}
                onChange={(selected) => {
                  updateFormData("stateId", selected);
                }}
                onBlur={() => {
                  if (!formData.stateId)
                    errors.stateId = "Please select/enter a State.";
                }}
              />
              {errors?.stateId && (
                <p className="text-red-500 text-sm text-start">
                  {errors.stateId}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
