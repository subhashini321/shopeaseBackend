
import Cart from "../models/cart.js";
import Product from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.body.id;
  
  try {
    // Find the product by its ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex >= 0) {
      // If the product is in the cart, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add a new item
      cart.items.push({ 
        product: productId, 
        quantity, 
        price: product.price,
        userId:req.body.id
      });
    }

    // Save the updated cart
    await cart.save();
    await Product.findOneAndUpdate({_id:productId},{$set:{addedCart:true}})

    // Respond with the updated cart
    res.json(cart);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server Error", error });
  }
};


export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.body.id ;
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message:error.error.message });
  }
};
export const getCartItem = async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId directly
    const cart = await Cart.findOne({ userId }).populate('items.product'); // Ensure the query matches by userId

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Calculate product count
    const productCount = cart.items.length;

    res.json({
      cart,
      productCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





