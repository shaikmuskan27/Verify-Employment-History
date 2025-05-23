import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  User, 
  Building, 
  Calendar,
  FileCheck,
  Clock,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react';

interface WorkHistory {
  id: string;
  employer: string;
  position: string;
  startDate: string;
  endDate: string | null;
  status: 'verified' | 'pending' | 'rejected';
  proofId: string | null;
  verifiedOn: string | null;
  confidenceScore: number | null;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'verified' | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch work history
    const fetchWorkHistory = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockWorkHistory: WorkHistory[] = [
        {
          id: '1',
          employer: 'Google, Inc.',
          position: 'Senior Software Engineer',
          startDate: '2012-03-15',
          endDate: '2022-05-30',
          status: 'verified',
          proofId: 'wv-7c9d3a1e5f',
          verifiedOn: '2023-11-15',
          confidenceScore: 97
        },
        {
          id: '2',
          employer: 'Microsoft Corporation',
          position: 'Software Developer',
          startDate: '2008-06-10',
          endDate: '2012-02-28',
          status: 'verified',
          proofId: 'wv-2b4f8d9c3a',
          verifiedOn: '2023-11-14',
          confidenceScore: 95
        },
        {
          id: '3',
          employer: 'BlockChain Future, Inc.',
          position: 'Backend Developer',
          startDate: '2015-07-10',
          endDate: '2017-11-22',
          status: 'pending',
          proofId: null,
          verifiedOn: null,
          confidenceScore: null
        },
        {
          id: '4',
          employer: 'Freelance',
          position: 'Web Developer',
          startDate: '2006-01-01',
          endDate: '2008-05-15',
          status: 'rejected',
          proofId: null,
          verifiedOn: null,
          confidenceScore: null
        }
      ];
      
      setWorkHistory(mockWorkHistory);
      setIsLoading(false);
    };
    
    if (user) {
      fetchWorkHistory();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const filteredHistory = activeTab === 'all' 
    ? workHistory 
    : workHistory.filter(item => item.status === 'verified');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Not Verified
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Employee Dashboard</h1>
                <p className="mt-1 text-blue-100">Manage and verify your work history</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="btn bg-white text-blue-900 hover:bg-gray-100 flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Employment
                </button>
              </div>
            </div>
          </div>
          
          {/* User Card */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-teal-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Trust Score: <span className="font-semibold text-teal-600">94%</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Last verified: 2 days ago</p>
              </div>
            </div>
          </div>
          
          {/* Work History Section */}
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Work History</h3>
              <div className="mt-3 md:mt-0 flex space-x-2">
                <button 
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    activeTab === 'all' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  All Entries
                </button>
                <button 
                  className={`px-3 py-1 text-sm font-medium rounded-md ${
                    activeTab === 'verified' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('verified')}
                >
                  Verified Only
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                <p className="mt-4 text-gray-500">Loading work history...</p>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No work history found</h3>
                <p className="text-gray-500 max-w-md">
                  {activeTab === 'verified' 
                    ? "You don't have any verified work history yet. Switch to 'All Entries' to see pending verifications."
                    : "Start by adding your employment history to get it verified."
                  }
                </p>
                <button className="mt-6 btn btn-primary flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Employment
                </button>
              </div>
            ) : (
              <div className="mt-2 overflow-hidden">
                <div className="grid grid-cols-1 gap-6">
                  {filteredHistory.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-grow">
                          <div className="flex items-center">
                            <h4 className="text-lg font-semibold text-gray-900">{item.employer}</h4>
                            <div className="ml-3">
                              {getStatusBadge(item.status)}
                            </div>
                          </div>
                          <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500">
                            <div className="flex items-center mb-1 sm:mb-0">
                              <FileCheck className="h-4 w-4 mr-1 text-gray-400" />
                              {item.position}
                            </div>
                            <span className="hidden sm:inline mx-2">•</span>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                              {new Date(item.startDate).toLocaleDateString()} - 
                              {item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Present'}
                            </div>
                          </div>
                          {item.status === 'verified' && (
                            <div className="mt-2 text-sm">
                              <span className="text-gray-500">Verified on: </span>
                              <span className="text-gray-700">{new Date(item.verifiedOn!).toLocaleDateString()}</span>
                              <span className="ml-3 text-gray-500">Confidence: </span>
                              <span className="text-gray-700">{item.confidenceScore}%</span>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-wrap justify-start md:justify-end gap-2">
                          {item.status === 'verified' && (
                            <>
                              <button className="btn btn-outline inline-flex items-center text-sm py-1.5">
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </button>
                              <button className="btn btn-primary inline-flex items-center text-sm py-1.5">
                                <Download className="h-4 w-4 mr-1" />
                                Proof
                              </button>
                            </>
                          )}
                          {item.status === 'pending' && (
                            <button className="btn bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 inline-flex items-center text-sm py-1.5">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Refresh Status
                            </button>
                          )}
                          {item.status === 'rejected' && (
                            <button className="btn bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 inline-flex items-center text-sm py-1.5">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              View Issues
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;