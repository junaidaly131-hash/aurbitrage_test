import { getAuthorizations, getAffiliations, getPeople } from "@/apis/dealer";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";

const DealerContext = createContext();

export const DealersProvider = ({ children }) => {
  const [peoples, setPeoples] = useState({
    loading: false,
    error: null,
    success: null,
    data: [],
  });
  const [affiliations, setAffliations] = useState({
    loading: false,
    error: null,
    success: null,
    data: [],
  });
  const [authorizations, setAuthorizations] = useState({
    loading: false,
    error: null,
    success: null,
    data: [],
  });
  const { id } = useParams();

  const fetchMembers = useCallback(async () => {
    setPeoples((prev) => {
      return { ...prev, loading: true };
    });
    const response = await getPeople(id);
    if (response.success) {
      setPeoples({
        loading: false,
        error: null,
        success: true,
        data: response.data,
      });
    } else {
      setPeoples((prev) => {
        return {
          ...prev,
          loading: false,
          error: response?.error || "Failed to fetch data",
          success: false,
        };
      });
    }
  }, [id]);
  const fetchAuthorizations = useCallback(async () => {
    setAuthorizations((prev) => {
      return { ...prev, loading: true };
    });
    const response = await getAuthorizations(id);
    if (response.success) {
      setAuthorizations({
        loading: false,
        error: null,
        success: true,
        data: response.data,
      });
    } else {
      setAuthorizations((prev) => {
        return {
          ...prev,
          loading: false,
          error: response?.error || "Failed to fetch data",
          success: false,
        };
      });
    }
  }, [id]);
  const fetchAffiliations = useCallback(async () => {
    setAffliations((prev) => {
      return { ...prev, loading: true };
    });
    const response = await getAffiliations(id);
    if (response.success) {
      setAffliations({
        loading: false,
        error: null,
        success: true,
        data: response.data,
      });
    } else {
      setAffliations((prev) => {
        return {
          ...prev,
          loading: false,
          error: response?.error || "Failed to fetch data",
          success: false,
        };
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAuthorizations();
      fetchAffiliations();
    }
  }, [fetchAuthorizations, fetchAffiliations, id]);

  const handleAddMember = useCallback((member) => {
    setPeoples((prev) => {
      return { ...prev, data: [...prev.data, member] };
    });
  }, []);
  const handleAffliation = useCallback((affiliation) => {
    setAffliations((prev) => {
      return { ...prev, data: [...prev.data, affiliation] };
    });
  }, []);
  const handleAuthorization = useCallback((affiliation) => {
    setAuthorizations((prev) => {
      return { ...prev, data: [...prev.data, affiliation] };
    });
  }, []);

  const value = useMemo(() => {
    return {
      peoples: { ...peoples, handleAddMember, getPeople: fetchMembers },
      authorizations: {
        ...authorizations,
        handleAuthorization,
        fetchAuthorizations,
      },
      affiliations: {
        ...affiliations,
        handleAffliation,
        fetchAffiliations,
      },
    };
  }, [
    peoples,
    handleAddMember,
    fetchMembers,
    handleAffliation,
    handleAuthorization,
    affiliations,
    authorizations,
  ]);

  return (
    <DealerContext.Provider value={value}>{children}</DealerContext.Provider>
  );
};

export const useDealers = () => useContext(DealerContext);
