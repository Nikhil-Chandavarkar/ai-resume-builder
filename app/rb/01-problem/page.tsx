import { StepLayout } from '@/components/StepLayout';

export const metadata = {
  title: 'Problem | AI Resume Builder',
  description: 'Define the problem for AI Resume Builder',
};

export default function ProblemPage() {
  return (
    <StepLayout stepNumber={1}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Define the Problem</h1>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            Welcome to Step 1 of the AI Resume Builder project. In this step, you'll define the core problem that this application solves.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What You Need to Do:</h2>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>• Identify the problem with current resume creation processes</li>
            <li>• Define user pain points</li>
            <li>• Create a clear problem statement</li>
            <li>• Document why this matters</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Next Steps:</h2>
          <ol className="text-gray-700 space-y-2">
            <li>1. Write your problem definition in the Build Panel</li>
            <li>2. Copy the content into Lovable</li>
            <li>3. Click "It Worked" to mark as complete</li>
            <li>4. Click "Next" to proceed to Market Analysis</li>
          </ol>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900 font-medium">💡 Tip:</p>
            <p className="text-sm text-blue-800 mt-1">
              Think about your target users and what challenges they face with their resumes.
            </p>
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
