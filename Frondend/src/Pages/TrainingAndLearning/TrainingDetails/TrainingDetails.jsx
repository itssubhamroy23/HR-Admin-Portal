// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//     ArrowLeft,
//     GraduationCap,
//     Users,
//     Calendar,
//     Clock,
//     Award,
//     FileText,
//     Video,
//     Link as LinkIcon,
//     CheckCircle,
//     BookOpen,
//     Target,
//     List,
//     UserPlus,
//     X
// } from 'lucide-react';
// import './TrainingDetails.css';

// const TrainingDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [showEnrollModal, setShowEnrollModal] = useState(false);

//     // Mock data - replace with actual API call
//     const mockTrainings = [
//         {
//             id: '1',
//             title: 'Advanced React Development',
//             description: 'Master modern React concepts including hooks, context, and performance optimization',
//             trainer: {
//                 id: 't1',
//                 name: 'Sarah Johnson',
//                 expertise: 'Senior React Developer',
//                 avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
//             },
//             startDate: '2025-02-01',
//             endDate: '2025-03-15',
//             duration: '6 weeks',
//             status: 'In Progress',
//             participants: [
//                 { id: 'e1', name: 'John Doe', department: 'Engineering', email: 'john@example.com', phone: '123-456-7890' },
//                 { id: 'e2', name: 'Jane Smith', department: 'Engineering', email: 'jane@example.com', phone: '123-456-7891' }
//             ],
//             progress: 65,
//             resources: [
//                 { title: 'Course Material', url: '#', type: 'pdf' },
//                 { title: 'Video Lectures', url: '#', type: 'video' },
//                 { title: 'Additional Resources', url: '#', type: 'link' }
//             ],
//             certificationAvailable: true,

//         }
//     ];

//     const training = mockTrainings.find(t => t.id === id);

//     if (!training) {
//         return <div>Training not found</div>;
//     }

//     const getResourceIcon = (type) => {
//         switch (type) {
//             case 'pdf': return <FileText className="training-details-icon" />;
//             case 'video': return <Video className="training-details-icon" />;
//             case 'link': return <LinkIcon className="training-details-icon" />;
//             default: return null;
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'In Progress': return 'training-details-status-progress';
//             case 'Completed': return 'training-details-status-completed';
//             case 'Upcoming': return 'training-details-status-upcoming';
//             default: return 'training-details-status-default';
//         }
//     };

//     return (
//         <div className="training-details-container">
//             {/* Header */}
//             <div className="training-details-header">
//                 <button
//                     onClick={() => navigate('/training')}
//                     className="training-details-back-button"
//                 >
//                     <ArrowLeft className="training-details-icon" />
//                     Back to Training List
//                 </button>

//             </div>

//             {/* Training Overview */}
//             <div className="training-details-overview">
//                 <div className="training-details-overview-header">
//                     <div>
//                         <h1 className="training-details-title">{training.title}</h1>
//                         <p className="training-details-description">{training.description}</p>
//                     </div>
//                     <span className={`training-details-status ${getStatusColor(training.status)}`}>
//                         {training.status}
//                     </span>
//                 </div>

//                 <div className="training-details-grid">
//                     <div className="training-details-trainer">
//                         <p className="training-details-label">Trainer</p>
//                         <div className="training-details-trainer-info">
//                             <img
//                                 src={training.trainer.avatar}
//                                 alt={training.trainer.name}
//                                 className="training-details-avatar"
//                             />
//                             <div className="training-details-trainer-text">
//                                 <p className="training-details-trainer-name">{training.trainer.name}</p>
//                                 <p className="training-details-trainer-expertise">{training.trainer.expertise}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="training-details-duration">
//                         <p className="training-details-label">Duration</p>
//                         <div className="training-details-info">
//                             <Clock className="training-details-icon" />
//                             <p>{training.duration}</p>
//                         </div>
//                     </div>

//                     <div className="training-details-dates">
//                         <p className="training-details-label">Dates</p>
//                         <div className="training-details-info">
//                             <Calendar className="training-details-icon" />
//                             <p>
//                                 {new Date(training.startDate).toLocaleDateString()} -
//                                 {new Date(training.endDate).toLocaleDateString()}
//                             </p>
//                         </div>
//                     </div>

//                     <div className="training-details-progress">
//                         <p className="training-details-label">Progress</p>
//                         <div className="training-details-progress-bar-container">
//                             <div className="training-details-progress-bar">
//                                 <div
//                                     className="training-details-progress-fill"
//                                     style={{ width: `${training.progress}%` }}
//                                 />
//                             </div>
//                             <p className="training-details-progress-text">{training.progress}% Complete</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Content Grid */}
//             <div className="training-details-content-grid">
//                 <div className="training-details-main-content">



//                     {/* Resources */}
//                     <div className="training-details-section">
//                         <h2 className="training-details-section-title">
//                             <BookOpen className="training-details-icon" />
//                             Course Resources
//                         </h2>
//                         <div className="training-details-resources">
//                             {training.resources.map((resource, index) => (
//                                 <a
//                                     key={index}
//                                     href={resource.url}
//                                     className="training-details-resource"
//                                 >
//                                     {getResourceIcon(resource.type)}
//                                     <span>{resource.title}</span>
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="training-details-sidebar">

//                     {/* Participants */}
//                     <div className="training-details-section">
//                         <h2 className="training-details-section-title">
//                             <Users className="training-details-icon" />
//                             Participants ({training.participants.length})
//                         </h2>
//                         <div className="training-details-participants">
//                             {training.participants.map((participant) => (
//                                 <div key={participant.id} className="training-details-participant">
//                                     <div>
//                                         <p className="training-details-participant-name">{participant.name}</p>
//                                         <p className="training-details-participant-dept">{participant.department}</p>
//                                     </div>
//                                     <div className="training-details-participant-email">
//                                         {participant.email}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>



//                     {/* Certification */}
//                     {training.certificationAvailable && (
//                         <div className="training-details-section">
//                             <div className="training-details-certification-header">
//                                 <h2 className="training-details-section-title">
//                                     <Award className="training-details-icon" />
//                                     Certification
//                                 </h2>
//                                 <span className="training-details-certification-status">
//                                     <CheckCircle className="training-details-icon" />
//                                     Available
//                                 </span>
//                             </div>
//                             <p className="training-details-certification-text">
//                                 Complete this training to earn a certification in {training.title}
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div >
//         </div >
//     );
// };



// export default TrainingDetails;


















import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, GraduationCap, Users, Calendar, Clock, Award,
    FileText, Video, Link as LinkIcon, CheckCircle, BookOpen
} from 'lucide-react';
import './TrainingDetails.css';

const TrainingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [training, setTraining] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTraining = async () => {
            try {
                console.log("This is admin side Id:-", id);
                const response = await fetch(`http://localhost:5000/trainings/FormattedTrainingById/${id}`);
                if (!response.ok) throw new Error("Failed to fetch training details.");
                const data = await response.json();
                console.log("adfasfafadssdasdfad", data);
                setTraining(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTraining();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!training) return <div>Training not found</div>;

    const getResourceIcon = (type) => {
        switch (type) {
            case 'pdf': return <FileText className="training-details-icon" />;
            case 'video': return <Video className="training-details-icon" />;
            case 'link': return <LinkIcon className="training-details-icon" />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress': return 'training-details-status-progress';
            case 'Completed': return 'training-details-status-completed';
            case 'Upcoming': return 'training-details-status-upcoming';
            default: return 'training-details-status-default';
        }
    };

    return (
        <div className="training-details-container">
            <div className="training-details-header">
                <button onClick={() => navigate('/training')} className="training-details-back-button">
                    <ArrowLeft className="training-details-icon" />
                    Back to Training List
                </button>
            </div>

            <div className="training-details-overview">
                <div className="training-details-overview-header">
                    <div>
                        <h1 className="training-details-title">{training?.title}</h1>
                        <p className="training-details-description">{training?.description}</p>
                    </div>
                    <span className={`training-details-status ${getStatusColor(training?.status)}`}>
                        {training?.status}
                    </span>
                </div>

                <div className="training-details-grid">
                    <div className="training-details-trainer">
                        <p className="training-details-label">Trainer</p>
                        <div className="training-details-trainer-info">
                            <img
                                src={training?.trainer.avatar}
                                alt={training?.title}
                                className="training-details-avatar"
                            />
                            <div className="training-details-trainer-text">
                                <p className="training-details-trainer-name">{training?.trainer.name}</p>
                                <p className="training-details-trainer-expertise">{training?.trainer.expertise}</p>
                            </div>
                        </div>
                    </div>

                    <div className="training-details-duration">
                        <p className="training-details-label">Duration</p>
                        <div className="training-details-info">
                            <Clock className="training-details-icon" />
                            <p>{training.startDate}</p>
                            <p>{training.endDate}</p>
                        </div>
                    </div>

                    <div className="training-details-dates">
                        <p className="training-details-label">Dates</p>
                        <div className="training-details-info">
                            <Calendar className="training-details-icon" />
                            <p>
                                {new Date(training.startDate).toLocaleDateString()} -
                                {new Date(training.endDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="training-details-progress">
                        <p className="training-details-label">Progress</p>
                        <div className="training-details-progress-bar-container">
                            <div className="training-details-progress-bar">
                                <div className="training-details-progress-fill" style={{ width: `${training.progress}%` }} />
                            </div>
                            <p className="training-details-progress-text">{training.progress}% Complete</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="training-details-content-grid">
                <div className="training-details-main-content">
                    {/* Resources */}
                    <div className="training-details-section">
                        <h2 className="training-details-section-title">
                            <BookOpen className="training-details-icon" />
                            Course Resources
                        </h2>
                        <div className="training-details-resources">
                            {training.resources.map((resource, index) => (
                                <a key={index} href={resource.url} className="training-details-resource">
                                    {getResourceIcon(resource.type)}
                                    <span>{resource.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="training-details-sidebar">
                    {/* Participants */}
                    <div className="training-details-section">
                        <h2 className="training-details-section-title">
                            <Users className="training-details-icon" />
                            Participants ({training.participants?.length})
                        </h2>
                        <div className="training-details-participants">
                            {training?.participants?.map((participant) => (
                                <div key={participant.id} className="training-details-participant">
                                    <div>
                                        <p className="training-details-participant-name">{participant.name}</p>
                                        <p className="training-details-participant-dept">{participant.department}</p>
                                    </div>
                                    <div className="training-details-participant-email">
                                        {participant.email}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certification */}
                    {training.certificationAvailable && (
                        <div className="training-details-section">
                            <div className="training-details-certification-header">
                                <h2 className="training-details-section-title">
                                    <Award className="training-details-icon" />
                                    Certification
                                </h2>
                                <span className="training-details-certification-status">
                                    <CheckCircle className="training-details-icon" />
                                    Available
                                </span>
                            </div>
                            <p className="training-details-certification-text">
                                Complete this training to earn a certification in {training.title}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrainingDetails;







































// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     ArrowLeft,
//     GraduationCap,
//     Users,
//     Calendar,
//     Clock,
//     Award,
//     FileText,
//     Video,
//     Link as LinkIcon,
//     CheckCircle,
//     BookOpen,
// } from "lucide-react";
// import "./TrainingDetails.css";

// const TrainingDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [showEnrollModal, setShowEnrollModal] = useState(false);
//     const [trainers, setTrainers] = useState([]); // Store trainers list
//     const [formData, setFormData] = useState({ trainerId: "" });
//     const [training, setTraining] = useState(null); // Store fetched training details

//     // Fetch training details
//     useEffect(() => {
//         const fetchTrainingDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/trainings/${id}`);
//                 if (!response.ok) throw new Error("Failed to fetch training details");
//                 const data = await response.json();
//                 setTraining(data);
//             } catch (error) {
//                 console.error("Error fetching training:", error);
//             }
//         };

//         fetchTrainingDetails();
//     }, [id]);

//     // Fetch trainers from the backend
//     useEffect(() => {
//         const fetchTrainers = async () => {
//             try {
//                 const response = await fetch("https://localhost:5000/trainers"); // Replace with your API
//                 if (!response.ok) throw new Error("Failed to fetch trainers");
//                 const data = await response.json();
//                 setTrainers(data); // Assuming response is an array of trainers
//             } catch (error) {
//                 console.error("Error fetching trainers:", error);
//             }
//         };

//         fetchTrainers();
//     }, []);

//     // Handle select change
//     const handleInputChange = (event) => {
//         setFormData({ ...formData, trainerId: event.target.value });
//     };

//     if (!training) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="training-details-container">
//             {/* Header */}
//             <div className="training-details-header">
//                 <button onClick={() => navigate("/training")} className="training-details-back-button">
//                     <ArrowLeft className="training-details-icon" />
//                     Back to Training List
//                 </button>
//             </div>

//             {/* Training Overview */}
//             <div className="training-details-overview">
//                 <h1 className="training-details-title">{training.title}</h1>
//                 <p className="training-details-description">{training.description}</p>

//                 <div className="training-details-grid">
//                     <div className="training-details-trainer">
//                         <p className="training-details-label">Trainer</p>
//                         <div className="training-details-trainer-info">
//                             <img src={training.trainer.avatar} alt={training.trainer.name} className="training-details-avatar" />
//                             <div className="training-details-trainer-text">
//                                 <p className="training-details-trainer-name">{training.trainer.name}</p>
//                                 <p className="training-details-trainer-expertise">{training.trainer.expertise}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="training-details-duration">
//                         <p className="training-details-label">Duration</p>
//                         <div className="training-details-info">
//                             <Clock className="training-details-icon" />
//                             <p>{training.duration}</p>
//                         </div>
//                     </div>

//                     <div className="training-details-dates">
//                         <p className="training-details-label">Dates</p>
//                         <div className="training-details-info">
//                             <Calendar className="training-details-icon" />
//                             <p>{new Date(training.startDate).toLocaleDateString()} - {new Date(training.endDate).toLocaleDateString()}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Trainer Selection */}
//             <div className="form-field">
//                 <label>Select Trainer</label>
//                 <select name="trainerId" value={formData.trainerId} onChange={handleInputChange} required>
//                     <option value="">Select Trainer</option>
//                     {trainers.map((trainer) => (
//                         <option key={trainer.id} value={trainer.id}>
//                             {trainer.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* Resources */}
//             <div className="training-details-section">
//                 <h2 className="training-details-section-title">
//                     <BookOpen className="training-details-icon" />
//                     Course Resources
//                 </h2>
//                 <div className="training-details-resources">
//                     {training.resources.map((resource, index) => (
//                         <a key={index} href={resource.url} className="training-details-resource">
//                             {resource.type === "pdf" ? <FileText className="training-details-icon" /> : null}
//                             {resource.type === "video" ? <Video className="training-details-icon" /> : null}
//                             {resource.type === "link" ? <LinkIcon className="training-details-icon" /> : null}
//                             <span>{resource.title}</span>
//                         </a>
//                     ))}
//                 </div>
//             </div>

//             {/* Participants */}
//             <div className="training-details-section">
//                 <h2 className="training-details-section-title">
//                     <Users className="training-details-icon" />
//                     Participants ({training.participants.length})
//                 </h2>
//                 <div className="training-details-participants">
//                     {training.participants.map((participant) => (
//                         <div key={participant.id} className="training-details-participant">
//                             <div>
//                                 <p className="training-details-participant-name">{participant.name}</p>
//                                 <p className="training-details-participant-dept">{participant.department}</p>
//                             </div>
//                             <div className="training-details-participant-email">{participant.email}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Certification */}
//             {training.certificationAvailable && (
//                 <div className="training-details-section">
//                     <h2 className="training-details-section-title">
//                         <Award className="training-details-icon" />
//                         Certification
//                     </h2>
//                     <p className="training-details-certification-text">
//                         Complete this training to earn a certification in {training.title}
//                     </p>
//                     <span className="training-details-certification-status">
//                         <CheckCircle className="training-details-icon" />
//                         Available
//                     </span>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TrainingDetails;
