import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Clock,
  Shield,
  Briefcase,
  Building,
  Search
} from 'lucide-react';

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  challenge: string;
  claim: string;
  icon: React.ReactNode;
}

interface VerificationResult {
  status: 'verified' | 'partial' | 'failed';
  message: string;
  details: string[];
  timeElapsed: string;
}

const DemoPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const scenarios: DemoScenario[] = [
    {
      id: 'scenario1',
      title: 'The Skeptical Startup',
      description: 'Verify a "10 years at Google" claim in under 60 seconds without contacting HR.',
      challenge: 'The challenge is to verify a long-term employment at a major tech company without needing to contact HR or request confirmation from the employer.',
      claim: 'John Smith worked at Google as a Senior Software Engineer from 2012 to 2022.',
      icon: <Building className="h-8 w-8 text-blue-500" />
    },
    {
      id: 'scenario2',
      title: 'The Disappearing Employer',
      description: 'Confirm employment at a now-bankrupt crypto startup from 2015-2017.',
      challenge: 'The challenge is to verify employment at a company that no longer exists, with records that may be lost or difficult to access.',
      claim: 'Jane Doe worked at BlockChain Future, Inc. as a Backend Developer from July 2015 to November 2017.',
      icon: <Briefcase className="h-8 w-8 text-amber-500" />
    },
    {
      id: 'scenario3',
      title: 'The Borderless Contractor',
      description: 'Validate patchwork employment across Germany, India, and Upwork.',
      challenge: 'The challenge is to verify a complex international employment history across multiple countries and platforms with different record-keeping systems.',
      claim: 'Alex Müller worked as a Software Consultant for TechGmbH in Berlin (2018-2019), Bangalore Solutions in India (2020), and as a freelancer on Upwork (2021-present).',
      icon: <Shield className="h-8 w-8 text-green-500" />
    }
  ];

  const selectScenario = (scenario: DemoScenario) => {
    setSelectedScenario(scenario);
    setResult(null);
  };

  const resetDemo = () => {
    setSelectedScenario(null);
    setResult(null);
  };

  const runVerification = async () => {
    if (!selectedScenario) return;
    
    setIsVerifying(true);
    setResult(null);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    let demoResult: VerificationResult;
    
    switch (selectedScenario.id) {
      case 'scenario1':
        demoResult = {
          status: 'verified',
          message: 'Employment at Google verified with high confidence',
          details: [
            'Verified through multiple independent data sources',
            'Position and dates confirmed through cryptographic attestations',
            'LinkedIn profile data cross-referenced and validated',
            'GitHub contribution history aligns with employment period',
            'Patent filings during employment period corroborate work',
            'Professional certifications match employment timeline'
          ],
          timeElapsed: '47 seconds'
        };
        break;
      case 'scenario2':
        demoResult = {
          status: 'partial',
          message: 'Employment partially verified with medium confidence',
          details: [
            'Company bankruptcy records confirm existence during claimed period',
            'Colleague attestations provide collaborative evidence',
            'Blockchain records of company transactions found',
            'GitHub commits to company repositories verified',
            'Limited payroll data recovered from distributed ledger',
            'Some gaps in verification due to lost company records'
          ],
          timeElapsed: '58 seconds'
        };
        break;
      case 'scenario3':
        demoResult = {
          status: 'verified',
          message: 'International employment verified across multiple jurisdictions',
          details: [
            'German employment records validated through digital attestation',
            'Indian work history confirmed via blockchain-based verification',
            'Upwork contract history and client reviews authenticated',
            'Payment records across multiple currencies reconciled',
            'Skills consistency verified across all employment periods',
            'Cross-border verification completed with high confidence'
          ],
          timeElapsed: '52 seconds'
        };
        break;
      default:
        demoResult = {
          status: 'failed',
          message: 'Verification failed',
          details: [
            'Insufficient data to complete verification',
            'Try providing more specific employment details'
          ],
          timeElapsed: '35 seconds'
        };
    }
    
    setResult(demoResult);
    setIsVerifying(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="h-8 w-8 text-green-500" />;
      case 'partial':
        return <AlertTriangle className="h-8 w-8 text-amber-500" />;
      case 'failed':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'partial':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'failed':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            WorkVerify Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our trustless verification system with these real-world scenarios.
          </p>
        </div>

        {!selectedScenario ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scenarios.map((scenario) => (
              <motion.div
                key={scenario.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                onClick={() => selectScenario(scenario)}
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    {scenario.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{scenario.title}</h3>
                  <p className="text-gray-600 mb-4">{scenario.description}</p>
                  <button className="text-teal-600 font-medium flex items-center">
                    Try this demo
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <button 
                onClick={resetDemo}
                className="text-teal-600 font-medium mb-4 inline-flex items-center"
              >
                <svg className="mr-1 w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Back to scenarios
              </button>
              <h2 className="text-2xl font-bold text-gray-900">{selectedScenario.title}</h2>
              <p className="mt-2 text-gray-600">{selectedScenario.description}</p>
            </div>
            
            <div className="p-6 bg-blue-50 border-b border-blue-100">
              <h3 className="text-lg font-medium text-blue-900 mb-2">The Challenge</h3>
              <p className="text-blue-800">{selectedScenario.challenge}</p>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">The Claim to Verify</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800">{selectedScenario.claim}</p>
              </div>
              
              {!result ? (
                <div className="mt-6">
                  <button
                    onClick={runVerification}
                    disabled={isVerifying}
                    className="w-full sm:w-auto btn btn-primary py-3 px-8 flex items-center justify-center"
                  >
                    {isVerifying ? (
                      <>
                        <Clock className="animate-spin h-5 w-5 mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Run Verification
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 space-y-6"
                >
                  <div className={`border rounded-lg p-4 ${getStatusClass(result.status)}`}>
                    <div className="flex items-center">
                      {getStatusIcon(result.status)}
                      <div className="ml-3">
                        <h4 className="font-semibold text-lg">{result.message}</h4>
                        <p className="text-sm">Verification completed in {result.timeElapsed}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Verification Details</h4>
                    <ul className="space-y-2">
                      {result.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <CheckCircle2 className="h-4 w-4 text-teal-500" />
                          </div>
                          <p className="ml-2 text-gray-700">{detail}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 flex space-x-4">
                    <button
                      onClick={() => setResult(null)}
                      className="btn btn-outline"
                    >
                      Verify Again
                    </button>
                    <button
                      onClick={resetDemo}
                      className="btn btn-primary"
                    >
                      Try Another Scenario
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-16 bg-blue-900 text-white rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">How WorkVerify Achieves Trustless Verification</h2>
            <p className="text-blue-100 mb-8">
              Our system combines multiple verification techniques to create mathematically unforgeable proofs without relying on centralized databases or employer cooperation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="font-semibold mb-2">Cryptographic Proofs</h3>
                <p className="text-blue-200 text-sm">
                  Zero-knowledge proofs verify claims without revealing sensitive data
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Distributed Storage</h3>
                <p className="text-blue-200 text-sm">
                  Employment records preserved even when companies disappear
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Multi-Factor Validation</h3>
                <p className="text-blue-200 text-sm">
                  Cross-references multiple sources to build confidence in claims
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;