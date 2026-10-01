export type LearningLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"

export type QuestionType =
  | "mcq"
  | "conceptual"
  | "scenario"
  | "numerical"

export type LearningLesson = {
  id: number
  title: string
  content: string
  keyPoints: string[]
  example: string
  takeaway: string
  questionTypes: QuestionType[]
}

export type LevelContent = {
  level: LearningLevel
  description: string
  lessons: LearningLesson[]
}

export type LearningTopic = {
  id: number
  title: string
  description: string
  level: LearningLevel
  progress: number
  content: string
  keyPoints: string[]
  levels: LevelContent[]
  lessons: LearningLesson[]
}

export const learningTopics: LearningTopic[] = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    description:
      "Build a strong foundation in Artificial Intelligence and understand how intelligent systems perceive, reason, learn, and make decisions.",
    level: "Beginner",
    progress: 0,

    content:
      "Learn the foundations of Artificial Intelligence, how intelligent systems work, major areas of AI, problem solving, search, knowledge representation, reasoning, and responsible AI.",

    keyPoints: [
      "AI is the broad field of building systems that perform intelligent tasks.",
      "AI systems can perceive information, reason, learn, and make decisions.",
      "Machine Learning and Deep Learning are important areas within AI.",
      "AI problems can be solved using search, rules, knowledge, and learning.",
      "Responsible AI considers fairness, privacy, safety, transparency, and reliability.",
    ],

    levels: [
      {
        level: "Beginner",
        description:
          "Understand the fundamental ideas of AI and how intelligent systems are used in the real world.",

        lessons: [
          {
            id: 101,
            title: "What is Artificial Intelligence?",
            content:
              "Artificial Intelligence, or AI, is the field of creating computer systems that can perform tasks that normally require human intelligence. These tasks include recognizing patterns, understanding language, solving problems, making predictions, and making decisions. AI systems do not necessarily think like humans. Instead, they are designed to produce intelligent behavior using rules, data, algorithms, or learned patterns.",
            keyPoints: [
              "AI stands for Artificial Intelligence.",
              "AI systems perform tasks associated with intelligent behavior.",
              "AI can involve reasoning, prediction, recognition, and decision-making.",
              "AI does not necessarily mean human-like thinking.",
            ],
            example:
              "A voice assistant receives spoken input, processes it, understands the request, and produces a useful response.",
            takeaway:
              "AI focuses on building systems that can perform tasks requiring intelligent behavior.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 102,
            title: "How AI Systems Work",
            content:
              "An AI system generally receives information as input, processes that information, and produces an output. Depending on the system, processing may involve rules, algorithms, machine learning models, or neural networks. Data quality, model design, and the way the system is trained can strongly affect the final result.",
            keyPoints: [
              "AI systems receive input and produce output.",
              "Algorithms and models process information.",
              "Many modern AI systems depend heavily on data.",
              "The quality of input and training data affects results.",
            ],
            example:
              "An image recognition system receives an image, analyzes visual patterns, and predicts whether it contains a cat, dog, car, or another object.",
            takeaway:
              "AI systems transform information into predictions, decisions, or generated results.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 103,
            title: "Major Areas of AI",
            content:
              "Artificial Intelligence contains many specialized areas. Machine Learning allows systems to learn patterns from data. Deep Learning uses neural networks with multiple layers. Natural Language Processing focuses on human language. Computer Vision works with images and videos. Generative AI creates new content such as text, images, audio, and code.",
            keyPoints: [
              "Machine Learning is a major area of AI.",
              "Deep Learning uses multi-layer neural networks.",
              "Natural Language Processing works with human language.",
              "Computer Vision works with visual information.",
              "Generative AI creates new content.",
            ],
            example:
              "A chatbot uses language technologies, an image classifier uses Computer Vision, and a text-generation model uses Generative AI.",
            takeaway:
              "AI is a broad field containing several specialized areas.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 104,
            title: "AI in the Real World",
            content:
              "AI is already used in everyday products and services. Recommendation systems personalize content, fraud detection systems identify suspicious transactions, navigation systems estimate routes, and educational systems can provide personalized learning support. AI is also used in healthcare, finance, transportation, agriculture, entertainment, and manufacturing.",
            keyPoints: [
              "AI is used across many industries.",
              "Recommendation systems personalize content.",
              "AI can identify patterns in large datasets.",
              "AI can support human decision-making.",
            ],
            example:
              "A streaming platform can study what a user watches and recommend movies or shows with similar characteristics.",
            takeaway:
              "AI is already integrated into many real-world applications.",
            questionTypes: ["mcq", "scenario", "conceptual"],
          },

          {
            id: 105,
            title: "AI vs Machine Learning vs Deep Learning",
            content:
              "Artificial Intelligence is the broad field of creating intelligent systems. Machine Learning is a subset of AI where systems learn patterns from data. Deep Learning is a subset of Machine Learning that uses neural networks with multiple layers. Generative AI is another important area that uses learned models to generate new content.",
            keyPoints: [
              "AI is the broadest concept.",
              "Machine Learning is a subset of AI.",
              "Deep Learning is a subset of Machine Learning.",
              "Modern Generative AI often uses Deep Learning.",
            ],
            example:
              "Think of AI as a large field. Machine Learning is one section inside AI, while Deep Learning is a specialized section inside Machine Learning.",
            takeaway:
              "AI is the broader field, while Machine Learning and Deep Learning are increasingly specialized approaches within it.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 106,
            title: "AI Problem Solving",
            content:
              "Many AI problems can be viewed as finding a solution from a set of possible choices. For example, an AI system may need to find a route, choose an action, or determine the best sequence of steps. Search strategies allow an AI system to explore possible states and find a solution according to a goal.",
            keyPoints: [
              "AI problems can often be represented using states and actions.",
              "A goal describes the desired result.",
              "Search explores possible solutions.",
              "Different search strategies can behave differently.",
            ],
            example:
              "A route-planning system can represent locations as states and roads as possible actions while searching for a route to the destination.",
            takeaway:
              "AI can solve some problems by representing possible states and searching for useful solutions.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 107,
            title: "AI, Data, and Knowledge",
            content:
              "Intelligent systems need information to make useful decisions. Data consists of observations or examples, while knowledge represents information that can help an intelligent system reason about a problem. Some AI systems learn patterns from data, while others use explicitly represented knowledge and rules.",
            keyPoints: [
              "Data provides observations or examples.",
              "Knowledge can help an AI system reason.",
              "Machine Learning discovers patterns from data.",
              "Rule-based systems can use explicitly defined knowledge.",
            ],
            example:
              "A medical decision-support system may combine patient information with medical knowledge to assist with possible diagnoses.",
            takeaway:
              "AI can use both learned patterns and represented knowledge to support intelligent behavior.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 108,
            title: "AI Challenges and Responsible AI",
            content:
              "AI systems can produce incorrect results, learn unwanted patterns, or behave unfairly when the data or system design has problems. Responsible AI focuses on fairness, privacy, transparency, safety, accountability, and reliability. AI systems should be evaluated carefully, especially when their decisions can affect people.",
            keyPoints: [
              "AI systems can make mistakes.",
              "Poor-quality or biased data can affect results.",
              "Privacy and safety are important.",
              "Responsible AI requires evaluation and human judgment.",
            ],
            example:
              "If an AI model is trained using incomplete data, it may perform poorly for situations that were not represented during training.",
            takeaway:
              "Building useful AI requires both technical performance and responsible design.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },
        ],
      },

      {
        level: "Intermediate",
        description:
          "Go deeper into AI problem solving, agents, search strategies, knowledge representation, and reasoning.",

        lessons: [
          {
            id: 111,
            title: "Intelligent Agents",
            content:
              "An intelligent agent is a system that perceives its environment and takes actions to achieve a goal. The agent receives information through sensors or inputs and produces actions through outputs or actuators. Intelligent agents can be designed to choose actions based on rules, search, learned models, or combinations of these approaches.",
            keyPoints: [
              "An agent perceives an environment.",
              "An agent takes actions.",
              "Agents operate toward goals.",
              "Decision-making can use rules, search, or learned models.",
            ],
            example:
              "A navigation agent receives information about roads and traffic and selects actions that help reach a destination.",
            takeaway:
              "An intelligent agent connects perception, decision-making, and action.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 112,
            title: "Problem Formulation and State Spaces",
            content:
              "Before solving an AI problem, the problem can be represented using an initial state, possible actions, transition results, and a goal state. The collection of possible states forms a state space. A good representation can make a difficult problem easier to solve because the system can focus its search on meaningful possibilities.",
            keyPoints: [
              "An initial state describes where the problem starts.",
              "Actions change the current state.",
              "A goal state represents the desired result.",
              "The state space contains possible configurations.",
            ],
            example:
              "In a route-planning problem, the starting city is the initial state, roads are actions, and the destination is the goal state.",
            takeaway:
              "Good problem formulation is an important part of building an AI solution.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 113,
            title: "Search Strategies",
            content:
              "AI systems can use search strategies to explore possible solutions. Breadth-First Search explores nodes level by level, while Depth-First Search explores one branch deeply before returning. Other strategies use costs or heuristic information to guide the search. The choice of strategy depends on the structure and requirements of the problem.",
            keyPoints: [
              "Search explores possible states.",
              "BFS explores level by level.",
              "DFS explores deeply along a branch.",
              "Heuristics can guide search toward promising states.",
            ],
            example:
              "A puzzle-solving system can use search to explore possible moves until it reaches a valid solution.",
            takeaway:
              "Different search strategies trade off memory, speed, completeness, and solution quality.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 114,
            title: "Knowledge Representation",
            content:
              "Knowledge representation is the process of representing information in a form that an AI system can use for reasoning. Knowledge can be represented using rules, logic, graphs, ontologies, or other structured forms. The representation should allow the system to derive useful conclusions from available information.",
            keyPoints: [
              "Knowledge must be represented in a usable form.",
              "Rules can express relationships between conditions and conclusions.",
              "Graphs can represent relationships between entities.",
              "Good representation supports reasoning.",
            ],
            example:
              "A knowledge graph can represent relationships between students, courses, skills, and career paths.",
            takeaway:
              "Knowledge representation provides structured information that AI systems can use for reasoning.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 115,
            title: "Logic and Reasoning in AI",
            content:
              "Reasoning allows an AI system to derive conclusions from available information. Logical rules can connect known facts to new conclusions. For example, if a system knows that all birds have certain properties and that a particular animal is a bird, it can use the rules to infer additional information.",
            keyPoints: [
              "Reasoning derives conclusions from information.",
              "Rules can connect facts and conclusions.",
              "Logical reasoning can support decision-making.",
              "AI systems can combine reasoning with learned models.",
            ],
            example:
              "If a system knows that a particular course requires Python and that a student has completed Python, it can infer that the prerequisite has been satisfied.",
            takeaway:
              "Reasoning allows AI systems to derive useful conclusions from structured information.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 116,
            title: "AI Evaluation",
            content:
              "AI systems need evaluation to determine whether they are performing their intended task correctly. Evaluation can consider accuracy, reliability, robustness, fairness, response quality, and other task-specific measures. A system that works well in one situation may still fail in another situation, so evaluation should cover realistic conditions.",
            keyPoints: [
              "AI systems should be evaluated systematically.",
              "Evaluation depends on the task.",
              "Accuracy alone may not capture every important property.",
              "Testing should include realistic situations.",
            ],
            example:
              "A chatbot can be evaluated not only on whether its answer is relevant but also on factual correctness and safety.",
            takeaway:
              "A useful AI system must be evaluated against the properties that matter for its intended use.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },
        ],
      },

      {
        level: "Advanced",
        description:
          "Study advanced AI reasoning, search optimization, decision-making, uncertainty, and modern intelligent systems.",

        lessons: [
          {
            id: 121,
            title: "Heuristic Search",
            content:
              "Heuristic search uses additional knowledge about a problem to guide the search toward promising states. A heuristic function estimates the remaining cost or distance to a goal. Algorithms such as Greedy Best-First Search and A* use heuristic information in different ways. A good heuristic can greatly reduce unnecessary exploration.",
            keyPoints: [
              "Heuristics estimate how promising a state is.",
              "Heuristic search can reduce unnecessary exploration.",
              "Greedy Best-First Search focuses strongly on estimated distance.",
              "A* combines path cost with heuristic estimation.",
            ],
            example:
              "A route-planning algorithm can use straight-line distance as a heuristic for estimating how far a location is from the destination.",
            takeaway:
              "Heuristics add problem-specific knowledge to make search more efficient.",
            questionTypes: ["mcq", "conceptual", "scenario", "numerical"],
          },

          {
            id: 122,
            title: "A* Search and Evaluation Functions",
            content:
              "A* search evaluates a state using the function f(n) = g(n) + h(n), where g(n) is the cost already spent reaching the state and h(n) estimates the remaining cost to the goal. When the heuristic is appropriate, A* can efficiently find a low-cost solution. The quality of the heuristic strongly influences the behavior of the algorithm.",
            keyPoints: [
              "g(n) represents the cost already traveled.",
              "h(n) estimates remaining cost.",
              "f(n) combines both values.",
              "A* balances cost already paid with estimated future cost.",
            ],
            example:
              "If g(n) = 8 and h(n) = 5, then f(n) = 13.",
            takeaway:
              "A* chooses states using both actual path cost and estimated remaining cost.",
            questionTypes: ["conceptual", "numerical", "scenario"],
          },

          {
            id: 123,
            title: "Decision Making Under Uncertainty",
            content:
              "Real-world AI systems often operate when information is incomplete or uncertain. Instead of treating every fact as absolutely known, an intelligent system can represent probabilities or confidence levels. Decision-making under uncertainty requires balancing possible outcomes, their likelihoods, and the consequences of actions.",
            keyPoints: [
              "Real-world information can be uncertain.",
              "Probability can represent uncertainty.",
              "Different actions can have different expected outcomes.",
              "AI decisions should consider uncertainty when appropriate.",
            ],
            example:
              "A weather-aware AI system may estimate different probabilities for rain and choose an action based on the expected consequences.",
            takeaway:
              "AI systems often need to reason about uncertainty rather than relying only on completely known facts.",
            questionTypes: ["mcq", "conceptual", "numerical", "scenario"],
          },

          {
            id: 124,
            title: "Planning and Sequential Decisions",
            content:
              "Planning involves selecting a sequence of actions that can move a system from an initial state toward a desired goal. Unlike a single decision, planning considers how one action affects future possibilities. AI planning is useful when the order of actions matters and the system needs to anticipate future states.",
            keyPoints: [
              "Planning involves multiple actions.",
              "The order of actions can matter.",
              "Each action can change future possibilities.",
              "Planning aims toward a desired goal state.",
            ],
            example:
              "A robot preparing an object for delivery may need to pick it up, move to another location, and place it at the correct destination in the right order.",
            takeaway:
              "Planning allows AI systems to reason about sequences of actions rather than isolated decisions.",
            questionTypes: ["conceptual", "scenario"],
          },

          {
            id: 125,
            title: "Multi-Agent Systems",
            content:
              "A multi-agent system contains multiple agents that interact within a shared environment. Agents may cooperate, compete, negotiate, or coordinate their actions. Designing such systems requires considering both individual goals and interactions between agents.",
            keyPoints: [
              "Multiple agents can operate in one environment.",
              "Agents may cooperate or compete.",
              "Coordination can improve system-level outcomes.",
              "Agent interactions can create complex behavior.",
            ],
            example:
              "Multiple delivery robots in a warehouse can coordinate their routes to reduce collisions and improve delivery efficiency.",
            takeaway:
              "Multi-agent AI focuses on intelligent behavior emerging from interactions between multiple agents.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 126,
            title: "Modern AI Systems and Responsible Deployment",
            content:
              "Modern AI systems often combine multiple techniques such as machine learning, neural networks, retrieval, reasoning, and external tools. Deploying such systems requires careful evaluation of reliability, safety, privacy, fairness, security, and cost. A technically capable model is not automatically a trustworthy system.",
            keyPoints: [
              "Modern AI systems can combine multiple AI techniques.",
              "Deployment requires more than model accuracy.",
              "Safety and reliability must be evaluated.",
              "Responsible deployment considers real-world impact.",
            ],
            example:
              "An AI education platform can combine a language model with curated learning content and student progress information while still requiring checks for incorrect or misleading responses.",
            takeaway:
              "Building advanced AI systems requires both technical design and responsible deployment.",
            questionTypes: ["conceptual", "scenario"],
          },
        ],
      },
    ],

    lessons: [],
  },

  {
    id: 2,
    title: "Machine Learning Basics",
    description:
      "Learn how machines learn patterns from data, build predictive models, evaluate performance, and improve their predictions.",
    level: "Beginner",
    progress: 0,

    content:
      "Learn Machine Learning fundamentals including data, features, labels, supervised and unsupervised learning, model training, evaluation, regression, classification, and practical ML reasoning.",

    keyPoints: [
      "Machine Learning learns patterns from data.",
      "Supervised learning uses labeled data.",
      "Unsupervised learning discovers patterns in unlabeled data.",
      "Regression predicts numerical values.",
      "Classification predicts categories.",
      "Model evaluation helps measure performance.",
    ],

    levels: [
      {
        level: "Beginner",
        description:
          "Build a strong foundation in Machine Learning concepts and understand how models learn from data.",

        lessons: [
          {
            id: 201,
            title: "What is Machine Learning?",
            content:
              "Machine Learning is a branch of AI where computers learn patterns from data and use those patterns to make predictions or decisions. Instead of manually writing every possible rule, we provide examples and an algorithm that can learn useful relationships from those examples.",
            keyPoints: [
              "Machine Learning learns patterns from data.",
              "Models learn from examples.",
              "A trained model can make predictions on new data.",
              "Machine Learning is an important part of AI.",
            ],
            example:
              "A model can learn from previous house prices and their features and then predict the price of a new house.",
            takeaway:
              "Machine Learning allows systems to learn useful patterns from examples.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 202,
            title: "Data, Features, and Labels",
            content:
              "Data provides the examples used by Machine Learning systems. Features describe useful properties of each example. In supervised learning, the expected answer is called a label. The model learns relationships between features and labels.",
            keyPoints: [
              "Data provides learning examples.",
              "Features describe properties of an example.",
              "Labels represent expected answers.",
              "Good data is important for good model performance.",
            ],
            example:
              "For predicting whether an email is spam, words and email characteristics can be features while spam/not spam is the label.",
            takeaway:
              "Features provide information to the model while labels provide the expected answer in supervised learning.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 203,
            title: "Supervised Learning",
            content:
              "Supervised Learning uses labeled examples. The model receives input data together with the correct output and learns a relationship between them. Two common supervised learning tasks are classification and regression.",
            keyPoints: [
              "Supervised Learning uses labeled data.",
              "Classification predicts categories.",
              "Regression predicts numerical values.",
              "The model learns from input-output examples.",
            ],
            example:
              "A classification model can predict whether a message is spam, while a regression model can predict the price of a house.",
            takeaway:
              "Supervised Learning learns from examples where the expected answer is already known.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 204,
            title: "Unsupervised Learning",
            content:
              "Unsupervised Learning works with data where labels are not provided. The model attempts to discover useful structures or patterns. Clustering is a common example where similar data points are grouped together.",
            keyPoints: [
              "Unsupervised Learning uses unlabeled data.",
              "The model searches for patterns or structure.",
              "Clustering groups similar examples.",
              "There is no predefined target label.",
            ],
            example:
              "A shopping platform can group customers according to similar purchasing behavior without manually assigning customer categories.",
            takeaway:
              "Unsupervised Learning discovers patterns without predefined labels.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 205,
            title: "Regression and Classification",
            content:
              "Regression is used when the desired output is a numerical value, while classification is used when the desired output belongs to a category. Choosing the correct problem type is an important first step when designing a Machine Learning solution.",
            keyPoints: [
              "Regression predicts numerical values.",
              "Classification predicts categories.",
              "The target variable helps determine the problem type.",
              "Different evaluation methods can be used for different tasks.",
            ],
            example:
              "Predicting tomorrow's temperature is a regression problem, while predicting whether a transaction is fraudulent is a classification problem.",
            takeaway:
              "The type of target output determines whether a problem is generally treated as regression or classification.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 206,
            title: "Training and Testing",
            content:
              "Machine Learning data is commonly divided into training and testing portions. Training data is used to learn patterns, while testing data is used to evaluate performance on examples that the model did not use during training. This helps determine whether the model can generalize.",
            keyPoints: [
              "Training data is used for learning.",
              "Testing data is used for evaluation.",
              "Testing uses unseen examples.",
              "Generalization is important.",
            ],
            example:
              "If a model learns from 800 images and is evaluated using 200 different images, the second group can provide evidence about how well the model handles unseen data.",
            takeaway:
              "Testing helps determine whether a model learned useful patterns rather than simply memorizing training examples.",
            questionTypes: ["mcq", "conceptual", "numerical", "scenario"],
          },

          {
            id: 207,
            title: "Overfitting and Underfitting",
            content:
              "A model can fail to generalize for different reasons. Overfitting occurs when a model learns the training data too closely and performs poorly on unseen data. Underfitting occurs when the model is too simple to capture important patterns in the data.",
            keyPoints: [
              "Overfitting can cause poor test performance.",
              "Underfitting can occur when a model is too simple.",
              "Good models should generalize to unseen data.",
              "Training and validation performance can help identify these problems.",
            ],
            example:
              "A model that gets nearly perfect results on training data but performs poorly on new examples may be overfitting.",
            takeaway:
              "The goal is not simply to perform well on training data but to generalize well to new data.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 208,
            title: "Basic Model Evaluation",
            content:
              "Model evaluation measures how well a Machine Learning model performs. For classification, accuracy is one simple measure: the number of correct predictions divided by the total number of predictions. Other measures such as precision and recall are useful when different types of errors have different importance.",
            keyPoints: [
              "Evaluation measures model performance.",
              "Accuracy measures the proportion of correct predictions.",
              "Precision focuses on predicted positives that are actually positive.",
              "Recall focuses on actual positives that were correctly detected.",
            ],
            example:
              "If a classifier makes 90 correct predictions out of 100 examples, its accuracy is 90%.",
            takeaway:
              "Evaluation metrics help us understand how well a model performs and what kinds of errors it makes.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },
        ],
      },

      {
        level: "Intermediate",
        description:
          "Learn practical Machine Learning concepts including preprocessing, algorithms, metrics, and model improvement.",

        lessons: [
          {
            id: 211,
            title: "Machine Learning Workflow",
            content:
              "A typical Machine Learning workflow includes understanding the problem, collecting data, cleaning and preparing the data, selecting features, splitting data, choosing a model, training it, evaluating it, and improving it. The workflow is iterative rather than strictly one-directional.",
            keyPoints: [
              "Problem definition comes before model selection.",
              "Data preparation is important.",
              "Training and evaluation are iterative.",
              "Model improvement can involve data, features, or algorithms.",
            ],
            example:
              "A student performance prediction system may first define the target, collect academic data, clean missing values, train a model, evaluate it, and then improve the pipeline.",
            takeaway:
              "Machine Learning is a complete workflow rather than simply choosing and training an algorithm.",
            questionTypes: ["conceptual", "scenario"],
          },

          {
            id: 212,
            title: "Data Preprocessing",
            content:
              "Raw data often contains missing values, inconsistent formats, duplicates, or irrelevant information. Data preprocessing prepares the data for learning. Common operations include handling missing values, encoding categorical data, scaling numerical features, and removing problematic records when appropriate.",
            keyPoints: [
              "Real-world data often needs cleaning.",
              "Missing values may need treatment.",
              "Categorical values may need encoding.",
              "Feature scaling can be important for some algorithms.",
            ],
            example:
              "If a dataset contains a missing age value, the value may need to be handled before training a model.",
            takeaway:
              "Good preprocessing can make the data more suitable for Machine Learning.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 213,
            title: "Feature Selection and Feature Engineering",
            content:
              "Features provide information to a model. Feature selection chooses useful existing features, while feature engineering creates or transforms features to make important patterns easier for a model to learn. Useful features can improve performance and reduce unnecessary complexity.",
            keyPoints: [
              "Feature selection chooses useful variables.",
              "Feature engineering creates or transforms variables.",
              "Irrelevant features can add noise.",
              "Domain understanding can help create useful features.",
            ],
            example:
              "Instead of using only separate purchase date fields, a model could use the number of days since the customer's last purchase as a derived feature.",
            takeaway:
              "Better representations of the input data can make Machine Learning models more effective.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 214,
            title: "Linear Regression",
            content:
              "Linear Regression models the relationship between input variables and a continuous numerical output. In simple linear regression, the prediction can be represented as y = mx + b. The model learns parameters that provide a useful fit to the training data.",
            keyPoints: [
              "Linear Regression predicts numerical values.",
              "Simple linear regression uses a linear relationship.",
              "The model learns parameters from training data.",
              "Predictions depend on input features and learned parameters.",
            ],
            example:
              "A simple model might predict house price from area using a learned linear relationship.",
            takeaway:
              "Linear Regression is a basic supervised learning method for predicting continuous values.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 215,
            title: "Decision Trees",
            content:
              "A Decision Tree makes predictions by asking a sequence of questions about the input features. Internal nodes represent decisions, branches represent possible outcomes, and leaves represent final predictions. Decision Trees can be used for both classification and regression.",
            keyPoints: [
              "Decision Trees split data using feature-based decisions.",
              "Branches represent possible outcomes.",
              "Leaves contain predictions.",
              "Decision Trees can handle classification and regression.",
            ],
            example:
              "A tree predicting whether a student needs additional practice might ask questions about quiz score and completed lessons before producing a recommendation.",
            takeaway:
              "Decision Trees represent predictions as a sequence of feature-based decisions.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 216,
            title: "K-Nearest Neighbors",
            content:
              "K-Nearest Neighbors, or KNN, predicts the output for a new example using nearby training examples. For classification, the most common class among the selected neighbors can determine the prediction. The value of K influences how local or broad the decision becomes.",
            keyPoints: [
              "KNN uses nearby examples.",
              "K determines how many neighbors are considered.",
              "Distance is used to identify nearby points.",
              "KNN can be used for classification and regression.",
            ],
            example:
              "If most of the nearest training examples belong to class A, a new example may be classified as class A.",
            takeaway:
              "KNN makes predictions by comparing a new example with similar existing examples.",
            questionTypes: ["mcq", "conceptual", "numerical", "scenario"],
          },

          {
            id: 217,
            title: "Confusion Matrix",
            content:
              "A confusion matrix summarizes classification results using true positives, true negatives, false positives, and false negatives. These values allow us to calculate metrics such as accuracy, precision, recall, and F1-score.",
            keyPoints: [
              "True Positive means a positive case was correctly identified.",
              "True Negative means a negative case was correctly identified.",
              "False Positive is an incorrect positive prediction.",
              "False Negative is a missed positive case.",
            ],
            example:
              "For a disease detection model, a false negative means the system predicts that a patient does not have the disease when the patient actually does.",
            takeaway:
              "A confusion matrix shows the types of correct and incorrect classification predictions.",
            questionTypes: ["conceptual", "numerical", "scenario"],
          },

          {
            id: 218,
            title: "Precision, Recall, and F1-Score",
            content:
              "Precision measures how many predicted positive cases were actually positive. Recall measures how many actual positive cases were successfully detected. F1-score combines precision and recall into a single measure using their harmonic mean. These metrics are especially useful when accuracy alone does not tell the complete story.",
            keyPoints: [
              "Precision = TP / (TP + FP).",
              "Recall = TP / (TP + FN).",
              "F1-score balances precision and recall.",
              "Different applications may prioritize different metrics.",
            ],
            example:
              "In fraud detection, a system may need to balance catching fraudulent transactions with avoiding too many legitimate transactions being incorrectly flagged.",
            takeaway:
              "Precision and recall provide more detailed information about classification errors than accuracy alone.",
            questionTypes: ["conceptual", "numerical", "scenario"],
          },
        ],
      },

      {
        level: "Advanced",
        description:
          "Study advanced Machine Learning concepts including optimization, ensembles, dimensionality reduction, imbalance, and model interpretation.",

        lessons: [
          {
            id: 221,
            title: "Gradient Descent",
            content:
              "Gradient Descent is an optimization method used to reduce a model's loss by repeatedly adjusting parameters in the direction that decreases the loss. The learning rate controls the size of each update. Choosing an appropriate learning rate is important because very large or very small updates can create problems.",
            keyPoints: [
              "Gradient Descent minimizes a loss function.",
              "Parameters are updated iteratively.",
              "The gradient indicates the direction of increasing loss.",
              "The learning rate controls update size.",
            ],
            example:
              "If a parameter update should move by 0.1 and the learning rate is 0.01, the effective update is much smaller than it would be with a learning rate of 0.1.",
            takeaway:
              "Gradient Descent learns model parameters by repeatedly moving toward lower loss.",
            questionTypes: ["conceptual", "numerical"],
          },

          {
            id: 222,
            title: "Regularization",
            content:
              "Regularization techniques discourage models from becoming unnecessarily complex. L1 and L2 regularization add penalties to the learning objective. These penalties can help reduce overfitting by encouraging simpler parameter configurations.",
            keyPoints: [
              "Regularization helps control model complexity.",
              "L1 regularization can encourage some parameters toward zero.",
              "L2 regularization penalizes large parameter values.",
              "Regularization can improve generalization.",
            ],
            example:
              "A model with many features may overfit training data, and regularization can discourage excessively large parameter values.",
            takeaway:
              "Regularization helps a model focus on useful patterns instead of fitting noise too closely.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 223,
            title: "Ensemble Learning",
            content:
              "Ensemble learning combines multiple models to produce a stronger overall predictor. Bagging trains models independently and combines their outputs, while boosting builds models sequentially so that later models focus on errors made by earlier ones. Random Forest and gradient boosting are common ensemble methods.",
            keyPoints: [
              "Ensembles combine multiple models.",
              "Bagging reduces variance by combining independent models.",
              "Boosting builds models sequentially.",
              "Random Forest is a bagging-based method using decision trees.",
            ],
            example:
              "A Random Forest combines predictions from many decision trees instead of relying on only one tree.",
            takeaway:
              "Combining multiple models can improve robustness and predictive performance.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 224,
            title: "Class Imbalance",
            content:
              "Class imbalance occurs when one class has many more examples than another. A model trained on highly imbalanced data can appear accurate while performing poorly on the minority class. Techniques such as resampling, class weighting, threshold adjustment, and appropriate evaluation metrics can help address imbalance.",
            keyPoints: [
              "Imbalanced datasets contain unequal class frequencies.",
              "Accuracy can be misleading on highly imbalanced data.",
              "Precision and recall can provide additional insight.",
              "Resampling and class weighting are possible strategies.",
            ],
            example:
              "If only 1% of transactions are fraudulent, a model predicting every transaction as legitimate could have high accuracy but detect no fraud.",
            takeaway:
              "When classes are imbalanced, evaluation should focus on the errors that matter rather than accuracy alone.",
            questionTypes: ["conceptual", "numerical", "scenario"],
          },

          {
            id: 225,
            title: "Dimensionality Reduction and PCA",
            content:
              "High-dimensional datasets can contain many correlated or redundant features. Principal Component Analysis, or PCA, transforms the original features into a smaller set of principal components that capture important variation in the data. PCA can be useful for visualization, compression, and reducing feature dimensionality.",
            keyPoints: [
              "High-dimensional data can be difficult to analyze.",
              "PCA creates new principal components.",
              "Principal components capture important variation.",
              "PCA can reduce the number of dimensions.",
            ],
            example:
              "A dataset with many correlated measurements can sometimes be represented using a smaller number of principal components while retaining much of the important variation.",
            takeaway:
              "PCA can represent high-dimensional data using fewer informative dimensions.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 226,
            title: "Cross-Validation",
            content:
              "Cross-validation evaluates a model using multiple train-validation splits. In k-fold cross-validation, the data is divided into k parts and the model is trained and evaluated multiple times, with each part serving as validation data once. This provides a more reliable estimate of model performance than relying on one split alone.",
            keyPoints: [
              "Cross-validation uses multiple data splits.",
              "K-fold cross-validation divides data into k parts.",
              "Each fold can serve as validation data.",
              "Results can be averaged across folds.",
            ],
            example:
              "With 5-fold cross-validation, the dataset is divided into five parts and the model is evaluated five times using a different validation fold each time.",
            takeaway:
              "Cross-validation provides a more robust estimate of how a model may perform on unseen data.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 227,
            title: "Model Interpretability",
            content:
              "Model interpretability concerns how well people can understand why a model produces particular predictions. Simple models can be easier to interpret, while complex models may require additional explanation techniques. Interpretability can be important when decisions affect people or when developers need to diagnose model behavior.",
            keyPoints: [
              "Interpretability helps people understand model behavior.",
              "Some models are naturally easier to interpret.",
              "Explanation techniques can help analyze complex models.",
              "Interpretability can be important in high-impact applications.",
            ],
            example:
              "A decision tree can show the sequence of conditions that led to a prediction, making its decision process easier to inspect.",
            takeaway:
              "A high-performing model is not always easy to understand, so interpretability can be an important design consideration.",
            questionTypes: ["conceptual", "scenario"],
          },

          {
            id: 228,
            title: "Model Generalization and Robustness",
            content:
              "Generalization describes how well a model performs on new data. Robustness describes how consistently it behaves when inputs change or contain expected variations. A strong model should not only perform well on a fixed test set but should remain useful under realistic changes in data.",
            keyPoints: [
              "Generalization concerns unseen data.",
              "Robustness concerns stability under variations.",
              "Test datasets should represent realistic conditions.",
              "Data shifts can reduce model performance.",
            ],
            example:
              "An image model trained on clear daytime photographs may perform differently on darker images or images captured from different viewpoints.",
            takeaway:
              "Advanced Machine Learning requires thinking about how models behave beyond the exact data used during development.",
            questionTypes: ["conceptual", "scenario"],
          },
        ],
      },
    ],

    lessons: [],
  },

  {
    id: 3,
    title: "Neural Networks",
    description:
      "Understand artificial neurons, weights, layers, activation functions, forward propagation, backpropagation, and deep learning.",
    level: "Beginner",
    progress: 0,

    content:
      "Learn how neural networks process information, calculate weighted sums, apply activation functions, propagate information through layers, and learn through backpropagation.",

    keyPoints: [
      "Neural networks contain interconnected artificial neurons.",
      "Weights determine the influence of inputs.",
      "Biases shift neuron calculations.",
      "Activation functions introduce non-linearity.",
      "Forward propagation produces predictions.",
      "Backpropagation helps update parameters.",
    ],

    levels: [
      {
        level: "Beginner",
        description:
          "Understand the basic structure and behavior of artificial neural networks.",

        lessons: [
          {
            id: 301,
            title: "What is a Neural Network?",
            content:
              "A neural network is a Machine Learning model made from connected artificial neurons. It receives input information, processes it through layers, and produces an output. Neural networks are useful for learning complex patterns from data.",
            keyPoints: [
              "Neural networks contain artificial neurons.",
              "Neurons are connected.",
              "Information moves through layers.",
              "Networks can learn complex patterns.",
            ],
            example:
              "A neural network can learn visual patterns from many images and classify a new image.",
            takeaway:
              "Neural networks learn patterns by processing information through connected neurons.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 302,
            title: "Artificial Neurons",
            content:
              "An artificial neuron receives input values, combines them using weights and a bias, and then applies an activation function. The result is passed to the next part of the network. This simple computation is repeated across many neurons.",
            keyPoints: [
              "A neuron receives input values.",
              "Weights determine input importance.",
              "A bias can shift the result.",
              "An activation function produces the final neuron output.",
            ],
            example:
              "A neuron receiving two inputs can assign different weights to them depending on how important each input is for the prediction.",
            takeaway:
              "An artificial neuron combines inputs using learned parameters before producing an output.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 303,
            title: "Weights and Bias",
            content:
              "Weights control how strongly individual inputs affect a neuron. A bias provides an additional adjustable value that shifts the weighted sum before activation. During training, the network learns useful values for its weights and biases.",
            keyPoints: [
              "Weights control input influence.",
              "Bias shifts the weighted sum.",
              "Weights and biases are learned parameters.",
              "Training changes these parameters.",
            ],
            example:
              "If a neuron has inputs 2 and 3 with weights 0.5 and 1, the weighted contribution before adding bias is 2 × 0.5 + 3 × 1 = 4.",
            takeaway:
              "Weights and biases are key parameters that allow neurons to learn useful relationships.",
            questionTypes: ["conceptual", "numerical"],
          },

          {
            id: 304,
            title: "Layers and Neural Network Architecture",
            content:
              "Neural networks commonly contain an input layer, one or more hidden layers, and an output layer. The input layer receives data, hidden layers transform the information, and the output layer produces the final prediction. Networks with many hidden layers are called deep neural networks.",
            keyPoints: [
              "The input layer receives information.",
              "Hidden layers transform representations.",
              "The output layer produces the final result.",
              "Multiple hidden layers form deep networks.",
            ],
            example:
              "In an image classifier, early layers may detect simple patterns while later layers combine those patterns into more meaningful features.",
            takeaway:
              "Layers allow neural networks to progressively transform input information into useful representations.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 305,
            title: "Activation Functions",
            content:
              "Activation functions transform the output of a neuron. They introduce non-linearity, allowing neural networks to learn relationships that cannot be represented effectively using only simple linear operations. Common activation functions include ReLU, sigmoid, and tanh.",
            keyPoints: [
              "Activation functions transform neuron outputs.",
              "They introduce non-linearity.",
              "ReLU is widely used in hidden layers.",
              "Sigmoid can produce values between 0 and 1.",
            ],
            example:
              "ReLU returns zero for negative input values and keeps positive values unchanged.",
            takeaway:
              "Activation functions allow neural networks to learn complex non-linear relationships.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 306,
            title: "Forward Propagation",
            content:
              "During forward propagation, input information moves from the input layer through hidden layers toward the output layer. Each neuron calculates a weighted sum, adds its bias, applies an activation function, and passes the result forward. The final layer produces the prediction.",
            keyPoints: [
              "Information moves forward through the network.",
              "Each neuron performs a calculation.",
              "Weights and biases affect the calculation.",
              "Activation functions transform the result.",
              "The output layer produces the prediction.",
            ],
            example:
              "A small network can calculate a weighted sum at its hidden neurons and then pass those values to an output neuron.",
            takeaway:
              "Forward propagation is the process of generating a prediction by moving information through the network.",
            questionTypes: ["conceptual", "numerical"],
          },

          {
            id: 307,
            title: "Loss Function",
            content:
              "A loss function measures how different a model's prediction is from the expected answer. During training, the goal is generally to reduce this loss. Different tasks use different loss functions depending on whether the model performs classification, regression, or another task.",
            keyPoints: [
              "Loss measures prediction error.",
              "Training attempts to reduce loss.",
              "Different tasks use different loss functions.",
              "Loss provides a signal for parameter updates.",
            ],
            example:
              "If a model predicts 0.8 when the expected value is 1.0, a suitable loss function can quantify the difference.",
            takeaway:
              "Loss tells the neural network how far its prediction is from the desired result.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 308,
            title: "Backpropagation and Learning",
            content:
              "During training, a neural network first produces a prediction. The loss function measures the error. Backpropagation calculates how the loss changes with respect to network parameters, and an optimization algorithm uses this information to update the weights and biases.",
            keyPoints: [
              "The network first makes a prediction.",
              "Loss measures the error.",
              "Backpropagation calculates useful gradients.",
              "Optimization updates weights and biases.",
            ],
            example:
              "If a network repeatedly predicts an image class incorrectly, training uses the error to adjust parameters so future predictions can improve.",
            takeaway:
              "Backpropagation provides the information needed to adjust neural network parameters during learning.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },
        ],
      },

      {
        level: "Intermediate",
        description:
          "Study deeper neural network concepts including training, optimization, common architectures, and practical model behavior.",

        lessons: [
          {
            id: 311,
            title: "Neural Network Computation",
            content:
              "A neuron calculates a weighted sum of its inputs and bias before applying an activation function. For inputs x1, x2 and weights w1, w2, the pre-activation value can be represented as z = w1x1 + w2x2 + b. The activation function then transforms z into the neuron's output.",
            keyPoints: [
              "The neuron first calculates a weighted sum.",
              "Bias is added before activation.",
              "The activation function transforms the pre-activation value.",
              "The resulting value becomes the neuron's output.",
            ],
            example:
              "For x1 = 2, x2 = 3, w1 = 0.5, w2 = 1, and b = 1, z = 2(0.5) + 3(1) + 1 = 5.",
            takeaway:
              "Understanding the neuron calculation makes forward propagation easier to understand.",
            questionTypes: ["conceptual", "numerical"],
          },

          {
            id: 312,
            title: "Multiple Neurons and Layers",
            content:
              "A neural network layer contains multiple neurons that process the same incoming representation using different learned weights and biases. Their outputs form a new representation that can be passed to the next layer. Increasing depth allows the network to learn hierarchical representations.",
            keyPoints: [
              "A layer can contain many neurons.",
              "Different neurons learn different transformations.",
              "Outputs of one layer become inputs to another.",
              "Deep networks can learn hierarchical representations.",
            ],
            example:
              "In an image model, one group of neurons may learn edge-like patterns while later layers combine those patterns into larger structures.",
            takeaway:
              "Multiple neurons and layers allow neural networks to build increasingly complex representations.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 313,
            title: "Softmax and Classification",
            content:
              "Softmax is commonly used in the output layer of a multi-class classification network. It converts a set of scores into values that sum to 1, which can be interpreted as a probability distribution over the classes.",
            keyPoints: [
              "Softmax is often used for multi-class classification.",
              "Outputs are between 0 and 1.",
              "The output values sum to 1.",
              "The largest output can indicate the predicted class.",
            ],
            example:
              "For three classes, a model might produce probabilities of 0.1, 0.7, and 0.2. The second class has the highest predicted probability.",
            takeaway:
              "Softmax converts output scores into a normalized distribution across multiple classes.",
            questionTypes: ["conceptual", "numerical"],
          },

          {
            id: 314,
            title: "Learning Rate and Optimization",
            content:
              "Neural networks use optimization algorithms to update their parameters during training. The learning rate controls the size of each update. A learning rate that is too large can cause unstable learning, while one that is too small can make training unnecessarily slow.",
            keyPoints: [
              "Optimization updates network parameters.",
              "Learning rate controls update size.",
              "Large learning rates can cause unstable updates.",
              "Small learning rates can slow training.",
            ],
            example:
              "If a parameter should move toward a lower-loss value, the learning rate determines how large the movement is during each update.",
            takeaway:
              "The learning rate is an important hyperparameter controlling how quickly a network learns.",
            questionTypes: ["conceptual", "numerical", "scenario"],
          },

          {
            id: 315,
            title: "Convolutional Neural Networks",
            content:
              "Convolutional Neural Networks, or CNNs, are neural network architectures particularly useful for visual data. Convolutional layers apply filters that detect local patterns. Deeper layers can combine these patterns into increasingly meaningful visual representations.",
            keyPoints: [
              "CNNs are commonly used for image-related tasks.",
              "Convolutional filters detect local patterns.",
              "Different filters can learn different visual features.",
              "Deeper layers can represent more complex patterns.",
            ],
            example:
              "A CNN may learn simple edge patterns in early layers and combine them into shapes and object parts in later layers.",
            takeaway:
              "CNNs use learned filters to efficiently extract useful patterns from images.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 316,
            title: "Recurrent Neural Networks",
            content:
              "Recurrent Neural Networks, or RNNs, are designed for sequential information. They process elements of a sequence while maintaining information from previous steps. This makes them useful for certain language, time-series, and sequence-processing tasks.",
            keyPoints: [
              "RNNs process sequential information.",
              "Previous information can influence later processing.",
              "RNNs can be used for time-series and language tasks.",
              "Modern sequence systems often use transformer architectures.",
            ],
            example:
              "An RNN can process a sequence of words one step at a time while carrying information from earlier words.",
            takeaway:
              "RNNs provide a way for neural networks to process information where sequence order matters.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },
        ],
      },

      {
        level: "Advanced",
        description:
          "Study advanced neural network architectures, optimization, attention, normalization, and model training behavior.",

        lessons: [
          {
            id: 321,
            title: "Gradient-Based Learning",
            content:
              "Neural network training relies on gradients that describe how changes in parameters affect the loss. Optimization algorithms use these gradients to update parameters. The process is repeated over many training examples and iterations until the model reaches a useful solution.",
            keyPoints: [
              "Gradients describe how loss changes with parameters.",
              "Optimization uses gradients to update parameters.",
              "Training involves repeated parameter updates.",
              "The optimization path depends on the loss landscape.",
            ],
            example:
              "If increasing a parameter increases the loss, gradient-based optimization can move that parameter in the opposite direction.",
            takeaway:
              "Gradients provide the mathematical signal used to improve neural network parameters.",
            questionTypes: ["conceptual", "numerical"],
          },

          {
            id: 322,
            title: "Vanishing and Exploding Gradients",
            content:
              "In deep or recurrent networks, gradients can become extremely small or extremely large as they propagate through many layers or time steps. Very small gradients can make learning slow, while very large gradients can make training unstable. Network architecture, activation functions, initialization, normalization, and optimization techniques can help manage these problems.",
            keyPoints: [
              "Gradients can become too small or too large.",
              "Vanishing gradients slow learning.",
              "Exploding gradients can make training unstable.",
              "Architecture and optimization choices can reduce these problems.",
            ],
            example:
              "A deep network may receive extremely small gradient values in early layers, making those layers update very slowly.",
            takeaway:
              "Stable gradient flow is important for successfully training deep neural networks.",
            questionTypes: ["conceptual", "scenario"],
          },

          {
            id: 323,
            title: "Batch, Epoch, and Iteration",
            content:
              "A batch is a group of training examples processed together. An epoch represents one complete pass through the training dataset. An iteration usually refers to one parameter update based on one batch. These concepts describe how training data is divided and processed.",
            keyPoints: [
              "A batch contains a group of examples.",
              "An epoch is one full pass through the training data.",
              "An iteration commonly corresponds to one parameter update.",
              "Batch size affects memory usage and training behavior.",
            ],
            example:
              "If a dataset contains 1,000 examples and the batch size is 100, one epoch contains approximately 10 iterations.",
            takeaway:
              "Batch, epoch, and iteration describe different units of neural network training.",
            questionTypes: ["conceptual", "numerical"],
          },

          {
            id: 324,
            title: "Batch Normalization and Training Stability",
            content:
              "Batch Normalization normalizes intermediate activations during training and introduces learnable parameters that allow the network to retain useful representations. It can improve training stability and sometimes allow the use of larger learning rates.",
            keyPoints: [
              "Batch Normalization operates on intermediate activations.",
              "It can improve training stability.",
              "It includes learnable parameters.",
              "It can interact with optimization behavior.",
            ],
            example:
              "A deep network may train more consistently when intermediate activations are normalized during training.",
            takeaway:
              "Normalization techniques can help make deep network training more stable.",
            questionTypes: ["mcq", "conceptual"],
          },

          {
            id: 325,
            title: "Attention Mechanism",
            content:
              "Attention allows a model to assign different importance to different parts of an input when producing a representation. Instead of treating every input element as equally relevant, attention calculates relationships between elements and focuses more strongly on useful information.",
            keyPoints: [
              "Attention assigns different importance to input elements.",
              "Relationships between elements are important.",
              "Attention can capture long-range dependencies.",
              "Transformer models rely heavily on attention.",
            ],
            example:
              "When interpreting a sentence, attention can help a model connect a word with another relevant word that appears much earlier in the sentence.",
            takeaway:
              "Attention allows neural networks to focus on relevant relationships within an input.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 326,
            title: "Transfer Learning",
            content:
              "Transfer Learning uses knowledge learned from one task or dataset as a starting point for another related task. Instead of training a large neural network entirely from scratch, a pretrained model can be adapted to a new problem. This can reduce training requirements when suitable pretrained knowledge exists.",
            keyPoints: [
              "Transfer Learning reuses learned representations.",
              "Pretrained models can be adapted to new tasks.",
              "It can reduce the amount of training needed.",
              "The source and target tasks should have useful relationships.",
            ],
            example:
              "A pretrained image model can be adapted to classify a smaller dataset of specialized images.",
            takeaway:
              "Transfer Learning allows existing neural network knowledge to be reused for related tasks.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 327,
            title: "Deep Learning Model Evaluation",
            content:
              "Evaluating deep learning models requires more than checking training accuracy. Validation performance, test performance, robustness, calibration, computational requirements, and task-specific errors can all matter. A model should be evaluated on data and conditions that reflect its intended use.",
            keyPoints: [
              "Training performance alone is insufficient.",
              "Validation and test performance should be examined.",
              "Robustness matters for real-world deployment.",
              "Evaluation should reflect the intended task.",
            ],
            example:
              "An image model should be tested on images that represent the conditions in which users will actually use the system.",
            takeaway:
              "Deep learning evaluation should consider both predictive performance and real-world behavior.",
            questionTypes: ["conceptual", "scenario"],
          },
        ],
      },
    ],

    lessons: [],
  },

  {
    id: 4,
    title: "Generative AI",
    description:
      "Explore how modern generative AI systems understand prompts, process tokens, use transformers, retrieve information, and generate new content.",
    level: "Beginner",
    progress: 0,

    content:
      "Learn Generative AI from fundamentals to advanced concepts including LLMs, tokens, embeddings, transformers, attention, prompt engineering, RAG, fine-tuning, agents, evaluation, and responsible AI.",

    keyPoints: [
      "Generative AI creates new content.",
      "LLMs learn patterns from large amounts of data.",
      "Tokens are basic units processed by language models.",
      "Transformers and attention are fundamental to modern LLMs.",
      "RAG connects language models with external information.",
      "AI agents can combine models with tools and actions.",
    ],

    levels: [
      {
        level: "Beginner",
        description:
          "Understand what Generative AI is, how LLMs work at a high level, and how to use prompts effectively.",

        lessons: [
          {
            id: 401,
            title: "What is Generative AI?",
            content:
              "Generative AI refers to AI systems that create new content such as text, images, audio, video, or code. Unlike systems that only classify existing information, generative systems produce new outputs based on patterns learned during training.",
            keyPoints: [
              "Generative AI creates new content.",
              "It can work with text, images, audio, video, and code.",
              "Models learn patterns from training data.",
              "User instructions can influence generated outputs.",
            ],
            example:
              "A text-generation model can create an explanation of Machine Learning when a student provides a suitable prompt.",
            takeaway:
              "Generative AI uses learned patterns to produce new content based on input or instructions.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 402,
            title: "How Large Language Models Work",
            content:
              "Large Language Models, or LLMs, are trained on large collections of text. They learn statistical and semantic patterns in language and can generate responses based on the context they receive. Modern LLMs can answer questions, summarize information, explain concepts, write code, and perform many other language tasks.",
            keyPoints: [
              "LLMs are trained on large amounts of text.",
              "They learn patterns in language.",
              "Context influences generated responses.",
              "LLMs can perform many language-related tasks.",
            ],
            example:
              "When a student asks an LLM to explain neural networks, the model uses the prompt and learned language patterns to generate a response.",
            takeaway:
              "LLMs generate language by using learned patterns together with the context provided in the prompt.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 403,
            title: "Prompts and Instructions",
            content:
              "A prompt is the input given to a Generative AI system. It can contain a question, instruction, context, examples, constraints, or a desired output format. Clear prompts make it easier for the model to understand what the user wants.",
            keyPoints: [
              "A prompt provides instructions or context.",
              "Prompts can specify constraints.",
              "Examples can guide the desired response.",
              "Output format can be included in a prompt.",
            ],
            example:
              "Instead of asking 'Explain AI', a student can ask an AI model to explain AI to a beginner using one example and five key points.",
            takeaway:
              "A clear prompt communicates the task, context, and expected response.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 404,
            title: "Tokens",
            content:
              "Language models process text using tokens. A token may represent a complete word, part of a word, punctuation, or another text unit depending on the tokenizer. The model processes sequences of tokens rather than directly processing human concepts as whole sentences.",
            keyPoints: [
              "LLMs process text as tokens.",
              "A token may be a word or part of a word.",
              "Tokenization depends on the tokenizer.",
              "Model context is measured in tokens.",
            ],
            example:
              "A long sentence may be divided into many smaller tokens before being processed by a language model.",
            takeaway:
              "Tokens are the basic units of text that language models process.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 405,
            title: "Generative AI Applications",
            content:
              "Generative AI can support education, content creation, software development, research assistance, customer support, design, and many other tasks. Different models can specialize in different types of content and capabilities.",
            keyPoints: [
              "Generative AI can assist with education.",
              "It can generate text, images, audio, and code.",
              "AI can support creative and productivity tasks.",
              "Different models can specialize in different tasks.",
            ],
            example:
              "An AI learning platform can use Generative AI to create practice questions, explain concepts, and provide personalized feedback.",
            takeaway:
              "Generative AI can support many creative, educational, and productivity-focused applications.",
            questionTypes: ["mcq", "scenario"],
          },

          {
            id: 406,
            title: "Limitations of Generative AI",
            content:
              "Generative AI can produce incorrect, incomplete, or misleading information. Models can also reflect limitations in their training data. Important considerations include factual reliability, privacy, bias, safety, copyright, and appropriate human verification.",
            keyPoints: [
              "Generative AI can produce incorrect information.",
              "AI responses should be evaluated.",
              "Privacy and safety matter.",
              "Important information should be verified.",
            ],
            example:
              "A student should verify an AI-generated explanation against reliable learning resources before using it for an important academic task.",
            takeaway:
              "Generative AI is powerful, but its outputs should not automatically be treated as correct.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },
        ],
      },

      {
        level: "Intermediate",
        description:
          "Understand tokens, embeddings, transformers, attention, prompt engineering, context windows, and Retrieval-Augmented Generation.",

        lessons: [
          {
            id: 411,
            title: "Tokenization in LLMs",
            content:
              "Before a language model processes text, the text is converted into tokens. Depending on the tokenizer, a token can correspond to a word, part of a word, punctuation, or another unit. Tokenization affects sequence length, context usage, and how efficiently a model processes text.",
            keyPoints: [
              "Text is converted into tokens before processing.",
              "Tokens may represent parts of words.",
              "Different tokenizers can produce different token sequences.",
              "Token count affects context usage.",
            ],
            example:
              "A sentence containing 20 words may produce more than 20 tokens if several words are divided into multiple pieces.",
            takeaway:
              "Tokenization determines how human text is represented internally for a language model.",
            questionTypes: ["mcq", "conceptual", "numerical"],
          },

          {
            id: 412,
            title: "Embeddings",
            content:
              "Embeddings represent information as numerical vectors. Text with similar meanings can be represented by vectors that are closer in the embedding space. Embeddings are useful for semantic search, recommendation, clustering, retrieval, and many AI applications.",
            keyPoints: [
              "Embeddings represent information as vectors.",
              "Similar meanings can produce similar vector representations.",
              "Embeddings support semantic search.",
              "Embeddings are widely used in retrieval systems.",
            ],
            example:
              "A search system can compare the embedding of a student's question with embeddings of learning resources to find conceptually relevant material.",
            takeaway:
              "Embeddings convert information into numerical representations that capture useful relationships.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 413,
            title: "Transformer Architecture",
            content:
              "Transformers are neural network architectures designed to process sequences efficiently using attention mechanisms. Unlike traditional recurrent processing, transformers can consider relationships between many tokens in parallel during computation. Transformer architectures form the foundation of many modern language models.",
            keyPoints: [
              "Transformers use attention extensively.",
              "They process relationships between tokens.",
              "They support efficient sequence processing.",
              "Many modern LLMs are transformer-based.",
            ],
            example:
              "A transformer can analyze relationships between different words in a sentence to help determine the meaning of the overall context.",
            takeaway:
              "Transformers provide the architectural foundation for many modern language models.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 414,
            title: "Self-Attention",
            content:
              "Self-attention allows each token to consider other tokens in the same input sequence when creating its representation. The mechanism uses query, key, and value representations to calculate how strongly different tokens should influence one another.",
            keyPoints: [
              "Self-attention connects tokens within the same sequence.",
              "Queries, keys, and values are used in attention calculations.",
              "Attention weights represent relationships between tokens.",
              "Self-attention helps capture contextual meaning.",
            ],
            example:
              "In a sentence containing a pronoun, self-attention can help the model connect the pronoun with relevant words elsewhere in the sentence.",
            takeaway:
              "Self-attention allows a model to build contextual representations by considering relationships between tokens.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 415,
            title: "Prompt Engineering",
            content:
              "Prompt Engineering involves designing instructions that help a Generative AI model produce useful results. Effective prompts can specify a role, task, context, constraints, examples, reasoning requirements, and output format. Prompt design is iterative because different models can respond differently to the same instruction.",
            keyPoints: [
              "Prompt Engineering focuses on instruction design.",
              "Context can improve task understanding.",
              "Examples can demonstrate the expected format.",
              "Constraints can make responses more consistent.",
            ],
            example:
              "A prompt can tell an AI tutor to explain a concept at an intermediate level, provide one example, and finish with three practice questions.",
            takeaway:
              "Good prompt design gives the model enough information to understand the desired task and response.",
            questionTypes: ["conceptual", "scenario"],
          },

          {
            id: 416,
            title: "Context Windows",
            content:
              "A language model can process only a limited amount of information in one context window. The context may contain the user's prompt, previous conversation, retrieved documents, and other information. Large context windows allow more information to be provided, but relevant information still needs to be selected and organized effectively.",
            keyPoints: [
              "A context window limits how much information is processed together.",
              "Prompts and retrieved documents consume context.",
              "Longer context does not automatically mean better answers.",
              "Relevant information should be prioritized.",
            ],
            example:
              "An AI tutor may need to select only the student's current lesson and relevant progress instead of sending an entire textbook every time.",
            takeaway:
              "Effective AI systems manage context carefully so the model receives useful information.",
            questionTypes: ["mcq", "conceptual", "scenario", "numerical"],
          },

          {
            id: 417,
            title: "Retrieval-Augmented Generation",
            content:
              "Retrieval-Augmented Generation, or RAG, combines information retrieval with text generation. Instead of relying only on information learned during model training, a RAG system retrieves relevant documents or passages and provides them to the language model as context before generating a response.",
            keyPoints: [
              "RAG combines retrieval and generation.",
              "Relevant information is retrieved before generation.",
              "Retrieved context can ground responses.",
              "RAG is useful when information comes from external knowledge sources.",
            ],
            example:
              "An AI learning platform can retrieve the student's selected lesson content and ask the language model to explain only that material.",
            takeaway:
              "RAG allows language models to use relevant external information during response generation.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },
        ],
      },

      {
        level: "Advanced",
        description:
          "Study advanced Generative AI concepts including transformer internals, fine-tuning, RAG architecture, agents, evaluation, and hallucination mitigation.",

        lessons: [
          {
            id: 421,
            title: "Transformer Architecture in Depth",
            content:
              "A transformer is commonly organized into layers containing attention and feed-forward components. Token representations are transformed repeatedly through these layers. Residual connections and normalization help information and gradients flow through deep networks. Different transformer designs can use encoder components, decoder components, or both.",
            keyPoints: [
              "Transformers are composed of repeated processing layers.",
              "Attention and feed-forward components are central building blocks.",
              "Residual connections help information flow.",
              "Normalization supports stable deep-network computation.",
              "Encoder-only, decoder-only, and encoder-decoder designs exist.",
            ],
            example:
              "A decoder-only language model processes previous tokens and predicts likely next tokens to generate a sequence.",
            takeaway:
              "Transformer architecture combines attention, feed-forward processing, residual connections, and normalization to build powerful sequence models.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 422,
            title: "Scaled Dot-Product Attention",
            content:
              "In scaled dot-product attention, queries and keys are compared using dot products to produce attention scores. The scores are scaled and passed through softmax to produce attention weights. These weights are then used to combine value vectors. The process allows each token representation to incorporate information from other relevant tokens.",
            keyPoints: [
              "Queries and keys determine attention scores.",
              "Scores are scaled before softmax.",
              "Softmax produces attention weights.",
              "Values are combined using those weights.",
            ],
            example:
              "If one token receives a higher attention weight for another token, information from that second token contributes more strongly to the resulting representation.",
            takeaway:
              "Scaled dot-product attention mathematically determines how information should flow between tokens.",
            questionTypes: ["conceptual", "numerical"],
          },

          {
            id: 423,
            title: "Fine-Tuning Language Models",
            content:
              "Fine-tuning adapts a pretrained model to a particular task or style using additional training data. The pretrained model provides general capabilities, while fine-tuning can specialize its behavior. Fine-tuning requires careful dataset preparation and evaluation because poor training data can negatively affect the resulting model.",
            keyPoints: [
              "Fine-tuning starts from a pretrained model.",
              "Additional data adapts the model to a target task.",
              "Dataset quality strongly affects the result.",
              "Fine-tuning should be evaluated carefully.",
            ],
            example:
              "A general language model can be adapted using examples that teach it a particular response format for an educational application.",
            takeaway:
              "Fine-tuning specializes an existing model using additional task-specific training data.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 424,
            title: "Advanced RAG Architecture",
            content:
              "Advanced RAG systems can include document ingestion, chunking, embedding generation, vector search, reranking, context construction, and answer generation. The quality of the final response depends not only on the language model but also on retrieval quality and how the retrieved information is presented.",
            keyPoints: [
              "RAG can contain multiple processing stages.",
              "Documents may be divided into chunks.",
              "Embeddings support semantic retrieval.",
              "Reranking can improve the relevance of retrieved results.",
              "Generation quality depends partly on retrieval quality.",
            ],
            example:
              "An AI learning system can split learning materials into sections, create embeddings, retrieve relevant sections for a student's question, and provide them to an LLM.",
            takeaway:
              "A strong RAG system depends on both effective retrieval and effective generation.",
            questionTypes: ["conceptual", "scenario"],
          },

          {
            id: 425,
            title: "AI Agents and Tool Use",
            content:
              "An AI agent can combine a language model with tools, memory, planning, and external actions. Instead of only generating text, an agent can decide when to retrieve information, call an API, perform a calculation, or execute another supported action. Reliable agent design requires controlling tool access and validating results.",
            keyPoints: [
              "Agents can combine language models with tools.",
              "Tools extend what a model can accomplish.",
              "Agents can make decisions about which tool to use.",
              "Tool outputs should be validated.",
            ],
            example:
              "An AI learning agent could retrieve a student's progress, generate a practice problem, calculate a score, and recommend the next lesson.",
            takeaway:
              "AI agents extend language models by connecting them with tools and actions.",
            questionTypes: ["mcq", "conceptual", "scenario"],
          },

          {
            id: 426,
            title: "Hallucination and Grounding",
            content:
              "A language model can generate fluent information that is incorrect or unsupported. This behavior is commonly called hallucination. Grounding techniques such as retrieval, structured data, tool calls, and verification can reduce unsupported responses, although they cannot guarantee perfect accuracy.",
            keyPoints: [
              "Language models can generate incorrect information confidently.",
              "Grounding connects responses to useful evidence or data.",
              "Retrieval can provide supporting context.",
              "Verification remains important for critical information.",
            ],
            example:
              "An AI tutor can retrieve the actual lesson content before answering a question about that lesson, reducing the chance of introducing unrelated information.",
            takeaway:
              "Grounding can reduce unsupported AI responses, but important outputs should still be evaluated.",
            questionTypes: ["conceptual", "scenario"],
          },

          {
            id: 427,
            title: "Evaluating Generative AI",
            content:
              "Generative AI systems require evaluation across multiple dimensions including factual correctness, relevance, helpfulness, safety, consistency, and task completion. Automated metrics can be useful, but human evaluation and task-specific tests are often needed to understand real-world quality.",
            keyPoints: [
              "Generative AI evaluation is multi-dimensional.",
              "Factual correctness is important.",
              "Relevance and task completion matter.",
              "Safety and consistency should be tested.",
              "Human evaluation can complement automated evaluation.",
            ],
            example:
              "An AI tutor can be evaluated using test questions where experts determine whether the generated explanation is correct, relevant, and appropriate for the student's level.",
            takeaway:
              "Evaluating Generative AI requires measuring the qualities that matter for the intended application.",
            questionTypes: ["conceptual", "scenario"],
          },

          {
            id: 428,
            title: "Responsible Generative AI",
            content:
              "Advanced Generative AI systems must consider privacy, security, fairness, copyright, misinformation, misuse, transparency, and human oversight. Responsible deployment involves understanding the system's limitations, defining appropriate use cases, protecting user data, and continuously evaluating the system after deployment.",
            keyPoints: [
              "Privacy and security must be protected.",
              "AI systems can produce biased or misleading content.",
              "Copyright and responsible data use matter.",
              "High-impact systems require careful evaluation and oversight.",
            ],
            example:
              "An AI education platform should avoid exposing private student information to unnecessary services and should clearly communicate that AI-generated explanations may require verification.",
            takeaway:
              "Responsible Generative AI requires technical safeguards, appropriate use, evaluation, and attention to real-world impact.",
            questionTypes: ["conceptual", "scenario"],
          },
        ],
      },
    ],

    lessons: [],
  },
]

export function getLevelLessons(
  topic: LearningTopic,
  level: LearningLevel
): LearningLesson[] {
  const levelContent = topic.levels.find(
    (item) => item.level === level
  )

  return levelContent?.lessons || []
}

export function getPersonalizedLearningTopics(): LearningTopic[] {
  const savedLevel =
    (localStorage.getItem(
      "ai-mentor-learning-level"
    ) as LearningLevel) || "Beginner"

  return learningTopics.map((topic) => {
    const lessons = getLevelLessons(topic, savedLevel)

    return {
      ...topic,
      level: savedLevel,
      lessons,
    }
  })
}

export function getTopicById(
  topicId: number
): LearningTopic | undefined {
  return learningTopics.find(
    (topic) => topic.id === topicId
  )
}

export function getLessonsForCurrentLevel(
  topicId: number
): LearningLesson[] {
  const topic = getTopicById(topicId)

  if (!topic) {
    return []
  }

  const savedLevel =
    (localStorage.getItem(
      "ai-mentor-learning-level"
    ) as LearningLevel) || "Beginner"

  return getLevelLessons(topic, savedLevel)
}
