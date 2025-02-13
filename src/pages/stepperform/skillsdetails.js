import React from "react";

export default function SkillsDetails({
  formData,
  updateFormData,
  errors,
  validateField,
}) {
  const handleAddSkill = () => {
    const updatedSkills = [...formData.skills, ""];
    updateFormData("skills", updatedSkills);
    validateField("skills");
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    updateFormData("skills", updatedSkills);
    validateField("skills");
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    updateFormData("skills", updatedSkills);
    validateField("skills");
  };

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
          Skills Details
        </h1>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Skills <span className="text-red-500">*</span>
            </label>

            {formData?.skills?.map((skill, index) => (
              <div key={index} className="flex space-x-6 mb-4">
                <input
                  type="text"
                  placeholder="Add Skill"
                  className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline ${
                    errors?.skills ? "border-red-500" : "border-gray-200"
                  }`}
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  onBlur={() => validateField("skills")}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Remove
                </button>
              </div>
            ))}

            {errors?.skills && (
              <p className="text-red-500 text-sm mb-2 text-start">
                {errors.skills}
              </p>
            )}

            <button
              type="button"
              onClick={handleAddSkill}
              className="text-white bg-blue-700 flex hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
