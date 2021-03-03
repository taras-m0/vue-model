import Model from "@/Model";
import SimpleModel from "./SimpleModel";

class WrapModel extends Model {
  id = Number

  simple = SimpleModel
}

export default WrapModel