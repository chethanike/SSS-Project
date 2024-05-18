const Code = require('../models/code_model');

exports.addCode = async (req, res) => {
    try {
      const { title, code } = req.body;
      const userId = req.user.userId; 
  
      const newCode = new Code({
        userId,
        title,
        code,
      });
  
      const savedCode = await newCode.save();
      res.status(201).json(savedCode);
    } catch (error) {
        
      res.status(500).json({ message: error.message });
    }
  };

  exports.getMyCodes = async (req, res) => {
    try {
      const userId = req.user.userId;
      const codes = await Code.find({ userId });
      res.status(200).json(codes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


exports.updateCode = async (req, res) => {
  const { id } = req.params;
  const { title, code } = req.body;
  try {
    const updatedCode = await Code.findByIdAndUpdate(
      id,
      { title, code },
      { new: true }
    );
    res.json(updatedCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCode = async (req, res) => {
  const { id } = req.params;
  try {
    await Code.findByIdAndDelete(id);
    res.json({ message: 'Code deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
